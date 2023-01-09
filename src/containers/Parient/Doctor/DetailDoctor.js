import React, { Component } from "react";
import { connect } from "react-redux";
import { geteDetailInfoDoctor } from "../../../services/userService";
import Header from "../../HomePage/Header";
import Footer from "../../HomePage/Section/Footer";
import DoctorExtraInfor from "../../System/Doctor/DoctorExtraInfor";
import "./Doctor.scss";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  //component did mount
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await geteDetailInfoDoctor(id);
      if (res?.data?.EC === 0) {
        this.setState({
          detailDoctor: res?.data?.DT,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    const { detailDoctor } = this.state;
    const { lang } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <div>
          <Header isShowBanner={false}></Header>
        </div>
        <div className="detail-container mt-3">
          <div className="intro-doctor">
            <div className="content-left">
              <img src={detailDoctor?.image || " "} alt="" />
            </div>
            <div className="content-right">
              <div className="doctor-title">
                {lang === "vi" ? nameVi : nameEn}
              </div>
              <div>{detailDoctor?.Markdown?.description}</div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorId={this.props.match.params.id}></DoctorSchedule>
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorId={this.props.match.params.id}></DoctorExtraInfor>
            </div>
          </div>
        </div>
        <div className="detail-info-doctor-container">
          <div className="detail-info-doctor mt-3">
            <div
              dangerouslySetInnerHTML={{
                __html: detailDoctor?.Markdown?.contentHTML,
              }}></div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
