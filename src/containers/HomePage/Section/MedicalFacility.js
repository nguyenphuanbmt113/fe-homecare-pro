import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import "../HomePage.scss";
import { withRouter } from "react-router";
import { ColorRing } from "react-loader-spinner";
let settings = {
  speed: 2000,
  autoplay: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: true,
  pauseOnHover: true,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: "",
      isLoadingClinic: false,
    };
  }
  async componentDidMount() {
    this.setState({
      isLoadingClinic: true,
    });
    const res = await getAllClinic();
    if (res.data.EC === 0) {
      this.setState({
        listClinic: res.data.DT || [],
      });
      this.setState({
        isLoadingClinic: false,
      });
    }
  }
  handleViewDetailClinic = (item) => {
    this.props.history.push(`detail-clinic/${item.id}`);
  };
  render() {
    const { listClinic } = this.state;
    return (
      <>
        <div className="section-container section-white">
          <div className="section-content">
            <div className="section-top">
              <span className="title1">
                {" "}
                <FormattedMessage id="banner.Medical-Facility"></FormattedMessage>
              </span>
              <span className="btn-section">
                {" "}
                <FormattedMessage id="banner.seemore"></FormattedMessage>
              </span>
            </div>
            <div className="slick-container">
              <Slider {...settings}>
                {listClinic &&
                  listClinic.length > 0 &&
                  listClinic.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}>
                        <div className="img-container">
                          <img src={item.image} alt="" className="" />
                        </div>
                        <div className="name-clinic">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
              {this.state.isLoadingClinic === true && (
                <div className="loading-container">
                  <div className="loading">
                    <ColorRing
                      visible={true}
                      height="50"
                      width="50"
                      ariaLabel="rotating-triangels-loading"
                      wrapperStyle={{}}
                      wrapperClass="rotating-triangels-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ]}
                    />
                  </div>
                  <div className="overlay"></div>
                </div>
              )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
