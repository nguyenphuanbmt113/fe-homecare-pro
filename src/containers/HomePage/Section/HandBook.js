import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../HomePage.scss";
import Slider from "react-slick";
import camnang1 from "../../../assets/image/cam-nang-1.jpg";
import camnang2 from "../../../assets/image/cam-nang-2.jpg";
import camnang3 from "../../../assets/image/cam-nang-3.png";
let settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
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
class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-container section-white">
          <div className="section-content">
            <div className="section-top">
              <span className="title1">
                {" "}
                <FormattedMessage id="banner.Handbook"></FormattedMessage>
              </span>
              <span className="btn-section">
                {" "}
                <FormattedMessage id="banner.seemore"></FormattedMessage>
              </span>
            </div>
            <div className="slick-container">
              <Slider {...settings}>
                <div className="handbook-content">
                  <div className="handbook-image">
                    <img src={camnang1} alt="" className="" />
                  </div>
                  <div className="handlebook-title">
                    8 địa chỉ khám bệnh Da liễu uy tín tại TP HCM
                  </div>
                </div>
                <div className="handbook-content">
                  <div className="handbook-image">
                    <img src={camnang2} alt="" className="" />
                  </div>
                  <div className="handlebook-title">
                    Review Top 5 địa chỉ điều trị nám da uy tín tại TP.HCM
                  </div>
                </div>
                <div className="handbook-content">
                  <div className="handbook-image">
                    <img src={camnang3} alt="" className="" />
                  </div>
                  <div className="handlebook-title">
                    Top 8 bác sĩ thần kinh giỏi và uy tín TPHCM (phần 2)
                  </div>
                </div>
              </Slider>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
