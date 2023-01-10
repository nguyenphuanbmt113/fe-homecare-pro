import React, { Component } from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { fetchTopDoctorHome } from "../../../store/actions/adminActions";
import { withRouter } from "react-router";
let settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        // dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
class DoctorFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctorData: [],
    };
  }

  componentDidMount() {
    this.props.getTopDoctor(10);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        topDoctorData: this.props.topDoctor,
      });
    }
  }
  //click to doctor
  handleClickDocotr = (doctorId) => {
    this.props.history.push(`detail-doctor/${doctorId}`);
  };
  render() {
    const { topDoctorData } = this.state;
    console.log(">>>>>>>>>>>topDoctorData param", topDoctorData);
    return (
      <div className="section-container section-doctor">
        <div className="section-content">
          <div className="section-top">
            <span className="title1">
              {" "}
              <FormattedMessage id="banner.Doctor-Facility"></FormattedMessage>
            </span>
            <span className="btn-section">
              {" "}
              <FormattedMessage id="banner.seemore"></FormattedMessage>
            </span>
          </div>
          <div className="slick-container">
            <Slider {...settings}>
              {topDoctorData &&
                topDoctorData.length > 0 &&
                topDoctorData.map((item, index) => {
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  let imageBase64 = "";
                  let doctor_specialty = item.Doctor_Infor.SpecialtyData.name;
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                    console.log("imageBase64", imageBase64);
                  }
                  return (
                    <div
                      className="doctor-container"
                      key={index}
                      onClick={() => this.handleClickDocotr(item.id)}>
                      <div className="image-doctor">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="title-doctor">
                        {this.props.lang === "vi" ? nameVi : nameEn}
                      </div>
                      <div className="doctor_specialty">{doctor_specialty}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctor: state.admin.topDoctor,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: (limit) => dispatch(fetchTopDoctorHome(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorFacility)
);
