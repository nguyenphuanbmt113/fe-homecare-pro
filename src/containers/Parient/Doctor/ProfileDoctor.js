import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileDoctorInforById } from "../../../services/userService";
import "./ProfileDoctor.scss";
import moment from "moment";
import localization from "moment/locale/vi";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  //life circle
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  //life circle update
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorId !== this.props.doctorId) {
      await this.getInforDoctor(this.props.doctorId);
    }
    if (prevProps.lang !== this.props.lang) {
    }
  }
  //get infordoctor
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorInforById(id);
      if (res && res.data.EC === 0) {
        result = res.data.DT;
      }
    }
    return result;
  };
  //render time booking
  renderTimeBooking = (dataTime) => {
    let { lang } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      const formattedTimeVi = moment(Number(dataTime.date)).format(
        "dddd - DD/MM/YYYY"
      );
      const formattedTimeEn = moment(Number(dataTime.date))
        .locale("en")
        .format("ddd - MM/DD/YYYY");
      const data = lang === "vi" ? formattedTimeVi : formattedTimeEn;
      const time =
        lang === "vi"
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div>
            {time} - {data}
          </div>
        </>
      );
    }
  };
  render() {
    const { dataProfile } = this.state;
    const { lang } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <>
        <div className="modal-top">
          <div className="img-container">
            <img src={dataProfile?.image || " "} alt="" />
          </div>
          <div className="content-left">
            <div className="">ĐẶT LỊCH KHÁM</div>
            <div className=""> {lang === "vi" ? nameVi : nameEn}</div>
            <div className="time-txt">
              {this.renderTimeBooking(this.props.dataTime)}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
