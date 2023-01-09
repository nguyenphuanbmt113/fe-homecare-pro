import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getClinicByQuery } from "../../../../services/userService";
import Header from "../../../HomePage/Header";
import Footer from "../../../HomePage/Section/Footer";
import DoctorScheduleV2 from "../../../Parient/Doctor/DoctorScheduleV2";
import ProfileDoctorV2 from "../../../Parient/Specialty/ProfileDoctorV2";
import "./DetailClinic.scss";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailClinic: {},
      arrDoctorId: [],
    };
  }
  //component did mount
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let { id } = this.props.match.params;
      let res = await getClinicByQuery(id);
      if (res.data.EC === 0) {
        let data = res.data.DT;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.ClinicData;
          if (arr && arr.length > 0) {
            arr.forEach((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          detailClinic: res.data.DT,
          arrDoctorId: arrDoctorId,
        });
        console.log("arrDoctorId", arrDoctorId);
      }
    }
  }
  render() {
    const { detailClinic, arrDoctorId } = this.state;
    console.log("detailClinic", detailClinic)
    return (
      <div className="detail-clinic">
        <div>
          <Header></Header>
        </div>
        <div className="image-container">
          {/* <div className="overlay"></div> */}
          <img src={detailClinic.image} alt="" className="" />
        </div>
        <div className="desc-wrap">
          <div className="desc-container">
            {detailClinic && !_.isEmpty(detailClinic) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailClinic?.descriptionHTML,
                }}></div>
            )}
          </div>
        </div>
        <div className="detail-clinic-wrap">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="detail-clinic-container">
                  <div className="content-left">
                    <ProfileDoctorV2 doctorId={item}></ProfileDoctorV2>
                  </div>
                  <div className="content-right">
                    <DoctorScheduleV2 doctorId={item}></DoctorScheduleV2>
                  </div>
                </div>
              );
            })}

          {arrDoctorId && arrDoctorId.length === 0 && (
            <div className="alert alert-danger no-data">
              Không có Bác Sĩ nào thuộc phòng phám này
            </div>
          )}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
