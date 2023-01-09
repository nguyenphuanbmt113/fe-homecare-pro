import React, { Component } from "react";
import { connect } from "react-redux";
import { getDoctorExtraInforById } from "../../../services/userService";
import "./DoctorExtraInfor.scss";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSeeMore: false,
      extraInforDoctor: {},
    };
  }
  handleShow = () => {
    this.setState({
      isShowSeeMore: true,
    });
  };
  handleClose = () => {
    this.setState({
      isShowSeeMore: false,
    });
  };
  //life circle
  async componentDidMount() {
    let res = await getDoctorExtraInforById(this.props.doctorId);
    if (res.data.EC === 0) {
      this.setState({
        extraInforDoctor: res.data.DT,
      });
    }
  }
  //did update
  async componentDidUpdate(prevProps) {}
  render() {
    const { extraInforDoctor } = this.state;
    return (
      <>
        <div className="content-up">
          <div className="title-1">Địa chỉ Khám</div>
          <div className="title-2">{extraInforDoctor?.nameClinic}</div>
          <div className="title-3">{extraInforDoctor?.addressClinic}</div>
          <div className="content-detail">
            <span className="free">
              Giá Khám: {extraInforDoctor?.priceData?.valueVi}
            </span>
            <span
              className={`blue ${
                this.state.isShowSeeMore === true ? "not-show" : ""
              }`}
              onClick={() => this.handleShow()}>
              Xem chi tiết
            </span>
          </div>
        </div>
        <div
          className={`content-down ${
            this.state.isShowSeeMore === true ? "show" : "not-show"
          }`}>
          <div className="top mb-2">
            <span className="">Giá Khám</span>
            <span>{extraInforDoctor?.priceData?.valueVi}</span>
          </div>
          <div className="mid">{extraInforDoctor?.note}</div>
          <div className="bottom">
            Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt
            thẻ
          </div>
          <div className="blue mt-2" onClick={() => this.handleClose()}>
            Ẩn bảng giá
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
