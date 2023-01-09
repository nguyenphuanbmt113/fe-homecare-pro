import _ from "lodash";
import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import DatePicker from "../../../../components/Input/DatePicker";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import { fetchGenderStart } from "../../../../store/actions/adminActions";
import { postBookingPatient } from "../../../../services/userService";
import moment from "moment";
// import _ from "lodash";
import localization from "moment/locale/vi";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //disable
      isDisabled: false,
      dataGender: [],
      //input form
      selectedItem: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
      birthday: "",
      reason: "",
      doctorId: "",
      timeType: "",
      lang: "",
    };
  }
  //life circle
  componentDidMount() {
    this.props.getGenderStart();
  }
  //did update
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderData !== this.props.genderData) {
      let formatData = this.handleFormatGender(this.props.genderData);
      this.setState({
        dataGender: formatData,
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        this.setState({
          doctorId: doctorId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        lang: this.props.language,
      });
    }
  }
  toggle = () => {
    this.props.toggle();
  };
  //handle Input Change
  handleOnChangeInput = (e, type) => {
    let cloneState = { ...this.state };
    cloneState[type] = e.target.value;
    this.setState({
      ...cloneState,
    });
  };
  //handle date picker
  handleChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  //handleFormatGender
  handleFormatGender = (dataGender) => {
    let arrGender = [];
    dataGender.forEach((item, index) => {
      arrGender.push({
        value: item.keyMap,
        label: item.valueEn,
      });
    });
    return arrGender;
  };
  //handleChangeGender
  handleChangeGender = (selectItem) => {
    this.setState({
      selectedItem: selectItem,
    });
  };
  //handle data time
  buildTimeBooking = (dataTime) => {
    let { lang } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      const formattedTimeVi = moment(Number(dataTime.date)).format(
        "dddd - DD/MM/YYYY"
      );
      const formattedTimeEn = moment(Number(dataTime.date))
        .locale("en")
        .format("ddd - MM/DD/YYYY");
      const date = lang === "vi" ? formattedTimeVi : formattedTimeEn;
      const time =
        lang === "vi"
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return `${time} - ${date}`;
    }
  };
  //build doctor Name
  buildDoctorName = (dataTime) => {
    let { lang } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let fullName =
        lang === "vi"
          ? `${dataTime?.doctorData.lastName} ${dataTime?.doctorData.firstName}`
          : `${dataTime?.doctorData.firstName} ${dataTime?.doctorData.lastName}`;

      return fullName;
    }
  };
  //enableComponents
  enableComponents() {
    this.setState({
      isDisabled: false,
    });
  }
  //handleSaveUser
  handleSaveUser = async () => {
    this.setState({
      isDisabled: true,
    });
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let fullName = this.buildDoctorName(this.props.dataTime);
    let date = new Date(this.state.birthday).getTime();
    const res = await postBookingPatient({
      selectedGender: this.state.selectedItem.value,
      fullName: fullName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      date: this.props.dataTime.date,
      birthday: date,
      reason: this.state.reason,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
    });
    setTimeout(
      function () {
        this.enableComponents();
      }.bind(this),
      2000
    );
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      this.toggle();
    } else {
      toast.error(res.data.EM);
    }
  };
  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        "&:hover": { borderColor: "gray", backGround: "gray" },
        border: "1px solid lightgray",
        boxShadow: "none",
        backGround: "gray",
      }),
    };
    let { dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <Modal
        backdrop={"static"}
        dialoglassname="modal"
        isOpen={this.props.isShow}
        toggle={() => this.toggle()}
        size={"xl"}
        centered>
        <ModalHeader toggle={() => this.toggle()}>
          Đặt Lịch Khám Bệnh
        </ModalHeader>
        <ModalBody>
          <div className="modal-container">
            <div className="modal-top-main">
              <ProfileDoctor
                doctorId={doctorId}
                dataTime={this.props.dataTime}></ProfileDoctor>
            </div>

            <div className="row content-mid">
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Họ Tên </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                />
              </div>
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Địa Chỉ Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                />
              </div>
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                />
              </div>
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                />
              </div>
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Ngày Sinh</label>
                <DatePicker
                  placeholder={"Your Birthday"}
                  onChange={this.handleChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}></DatePicker>
              </div>
              <div className="form-group col-4 mb-3">
                <label className="mb-1">Giới</label>
                <Select
                  styles={customStyles}
                  value={this.state.selectedItem}
                  onChange={this.handleChangeGender}
                  options={this.state.dataGender}
                  placeholder={"your gender"}
                />
              </div>
              <div className="form-group col-12 mb-3">
                <label className="mb-1"> Lý Do Khám </label>
                <div className="">
                  <textarea
                    rows="4"
                    cols="50"
                    className="text-booking"
                    placeholder="Description"
                    value={this.state.reason}
                    onChange={(e) =>
                      this.handleOnChangeInput(e, "reason")
                    }></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="mt- p-3 border-t">
            <Button
              disabled={this.state.isDisabled}
              color="primary"
              onClick={() => this.handleSaveUser()}
              className="px-3">
              Xác Nhận
            </Button>
            <Button
              color="secondary"
              onClick={() => this.toggle()}
              className="px-3 mx-3">
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderData: state.admin.genderData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
