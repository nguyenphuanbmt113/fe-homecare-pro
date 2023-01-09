import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllcodesBytype,
  getSpecialtyByQuery
} from "../../../services/userService";
import Header from "../../HomePage/Header";
import DoctorScheduleV2 from "../Doctor/DoctorScheduleV2";
import "./DetailSpecialty.scss";
import ProfileDoctorV2 from "./ProfileDoctorV2";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let { id } = this.props.match.params;
      let res = await getSpecialtyByQuery(id, "ALL");
      let res2 = await getAllcodesBytype("PROVINCE");
      if (res.data.EC === 0 && res2 && res.data.EC === 0) {
        let data = res.data.DT;

        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.SpecialtyData;
          if (arr && arr.length > 0) {
            arr.forEach((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        let allProvince = {
          keyMap: "ALL",
          type: "PROVINCE",
          valueEn: "ALL",
          valueVi: "Toàn Quốc",
        };
        this.setState({
          dataDetailSpecialty: res.data.DT,
          arrDoctorId: arrDoctorId,
          listProvince: [allProvince, ...res2.data.DT],
        });
      }
    }
  }
  componentDidUpdate() {}
  //handleChangeLocation
  handleChangeLocation = async (e) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let location = e.target.value;

      let { id } = this.props.match.params;
      let res = await getSpecialtyByQuery(id, location);
      if (res.data.EC === 0) {
        let data = res.data.DT;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.SpecialtyData;
          if (arr && arr.length > 0) {
            arr.forEach((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    return (
      <div className="detail-specialty">
        <Header></Header>
        <div className="infor-specialty-wrap">
          <div className="infor-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty?.descriptionHTML,
                }}></div>
            )}
          </div>
        </div>
        <div className="filter-doctor">
          <select onChange={(e) => this.handleChangeLocation(e)}>
            {listProvince &&
              listProvince.length > 0 &&
              listProvince.map((item, index) => {
                return (
                  <option key={index} value={item.keyMap}>
                    {item.valueVi}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="detail-specialty-wrap">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="detail-specialty-container">
                  <div className="content-left">
                    <ProfileDoctorV2 doctorId={item}></ProfileDoctorV2>
                  </div>
                  <div className="content-right">
                    <DoctorScheduleV2 doctorId={item}></DoctorScheduleV2>
                  </div>
                </div>
              );
            })}
        </div>
        {arrDoctorId && arrDoctorId.length === 0 && (
          <div class="alert alert-warning warning" role="alert">
            you don't have any data gateways
          </div>
        )}
        <div className="h-10"></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
