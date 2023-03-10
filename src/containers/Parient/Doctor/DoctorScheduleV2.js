import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorSchedule.scss";
import moment from "moment";
import {
  getDoctorExtraInforById,
  getSchedulebyDate,
} from "../../../services/userService";
import BookingModal from "./modal/BookingModal";
import DoctorExtraInfor from "../../System/Doctor/DoctorExtraInfor";
require("moment/locale/fr.js");
require("moment/min/locales.min");

class DoctorScheduleV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      allDay: [],
      allScheduleDetail: [],
      extraInforDoctor: {},

      //modal
      isShowModal: false,
      dataScheduleTimeModal: [],
    };
  }
  //toggle modal
  toggle = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };
  //get arrday
  getAlldays = (lang) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (lang === "vi") {
        obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      }
      if (lang === "en") {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    return arrDate;
  };
  //get extra doctor
  getExtraDoctor = async () => {
    let res = await getDoctorExtraInforById(this.props.doctorId);
    if (res.data.EC === 0) {
      this.setState({
        extraInforDoctor: res.data.DT,
      });
    }
  };
  //component did mount
  async componentDidMount() {
    let { lang } = this.props;
    let arrDays = this.getAlldays(lang);
    this.setState({
      allDay: arrDays,
    });
    if (arrDays && arrDays.length > 0) {
      const res = await getSchedulebyDate(
        this.props.doctorId,
        arrDays[0].value
      );
      if (res.data.EC === 0) {
        this.setState({
          allScheduleDetail: res?.data?.DT,
        });
      }
      this.getExtraDoctor();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  //handleCHange select
  handleChange = async (selectedItem) => {
    const res = await getSchedulebyDate(
      this.props.doctorId,
      selectedItem.value
    );
    this.setState({
      selectedItem: selectedItem.key,
    });
    if (res.data.EC === 0) {
      this.setState({
        allScheduleDetail: res?.data?.DT,
      });
    }
  };
  //btn show modal
  btnShowModal = (item) => {
    this.setState({
      isShowModal: true,
      dataScheduleTimeModal: item,
    });
  };
  render() {
    const { allScheduleDetail, extraInforDoctor } = this.state;
    console.log("extraInforDoctor", extraInforDoctor);
    const { doctorId } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <Select
              placeholder={"Choose Date"}
              value={this.state.selectedItem || this.state.allDay[0]}
              onChange={this.handleChange}
              options={this.state.allDay}
            />
          </div>
          <div className="all-time">
            <div className="text-time">
              <span>
                <i className="fas fa-calendar-alt"></i>
              </span>
              <span>L???ch Kh??m</span>
            </div>
            <div className="time-content">
              {allScheduleDetail &&
                allScheduleDetail.length > 0 &&
                allScheduleDetail.map((item, index) => {
                  return (
                    <div
                      className="btn-time"
                      key={index}
                      onClick={() => this.btnShowModal(item)}>
                      {this.props.lang === "vi"
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </div>
                  );
                })}
            </div>
            <div className="time-content">
              {allScheduleDetail && allScheduleDetail.length <= 0 && (
                <div className="text-not">Kh??ng c?? l???ch kh??m </div>
              )}
            </div>
          </div>

          <div className="mt-3 extra-doctor">
            <DoctorExtraInfor doctorId={doctorId}></DoctorExtraInfor>
          </div>
        </div>
        <BookingModal
          toggle={this.toggle}
          closeBtn={this.close}
          isShow={this.state.isShowModal}
          dataTime={this.state.dataScheduleTimeModal}></BookingModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorScheduleV2);
