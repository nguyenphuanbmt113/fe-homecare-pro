import React, { Component } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import "./ManagePatient.scss";
import moment from "moment";
import ModalRemedy from "./ModalRemedy";
import { toast } from "react-toastify";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //with modal
      isOpen: false,
      dataModal: {},
      currentDate: moment(new Date()).startOf("day").valueOf(),
      listDataPatient: [],

      //loading
      isLoading: false,
    };
  }
  //toggle modal
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  //life circle
  async componentDidMount() {
    this.getAllPatientForDoctor();
  }
  //handleChangeDatePicker
  handleChangeDatePicker = async (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        this.getAllPatientForDoctor();
      }
    );
  };
  //get all patient by date
  getAllPatientForDoctor = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatdate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor(user.id, formatdate);
    if (res.data.EC === 0) {
      this.setState({
        listDataPatient: res.data.DT,
      });
    }
  };
  //handleConfirm
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      lang: this.props.language,
      patientName: item.patientData.firstName,
    };
    this.setState({
      dataModal: data,
      isOpen: true,
    });
  };
  //handleSendFee
  handleRemedy = async (data) => {
    this.setState({
      isLoading: true,
    });
    let res = await postSendRemedy(data);
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      await this.getAllPatientForDoctor();
      this.setState({
        isLoading: false,
      });
      this.toggle();
    } else {
      toast.error(res.data.EM);
    }
  };
  render() {
    const { listDataPatient, isOpen, isLoading } = this.state;
    const { language } = this.props;
    return (
      <div className="manage-patient">
        <div className="manage-p-title">Quản Lý Bệnh Nhân Khám Bệnh</div>
        <div className="m-p-body row">
          <div className="col-6 form-group">
            <label htmlFor="" className="mb-2">
              Chọn Ngày Khám
            </label>
            <DatePicker
              placeholder={"Choose Day"}
              onChange={this.handleChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}></DatePicker>
          </div>
          <div className="manage-patient-table">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Thời Gian</th>
                  <th scope="col">Họ Và Tên</th>
                  <th scope="col">Địa Chỉ</th>
                  <th scope="col">Giới Tính</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listDataPatient && listDataPatient.length > 0 ? (
                  listDataPatient.map((item, index) => {
                    let time =
                      language === "vi"
                        ? item.timetypeDataPatient.valueVi
                        : item.timetypeDataPatient.valueEn;
                    let gender =
                      language === "vi"
                        ? item.patientData.genderData?.valueVi
                        : item.patientData.genderData?.valueEn;
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                        <td className="btn-actions">
                          <button
                            className="x-n"
                            onClick={() => this.handleConfirm(item)}>
                            Xác Nhận
                          </button>
                          <button
                            className="g-h"
                            onChange={() => this.handleRemedy()}>
                            Gửi Hóa Đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="alert alert-danger no-data" role="alert">
                    <td colSpan={6}>No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isOpen === true && (
            <ModalRemedy
              isOpen={this.state.isOpen}
              toggle={this.toggle}
              handleRemedy={this.handleRemedy}
              dataModal={this.state.dataModal}></ModalRemedy>
          )}

          {isLoading === true && (
            <div className="loading-container">
              <div className="loading">
                <RotatingTriangles
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="rotating-triangels-loading"
                  wrapperStyle={{}}
                  wrapperClass="rotating-triangels-wrapper"
                  colors={["#fff", "#fff", "#fff"]}
                />
              </div>
              <div className="overlay"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
