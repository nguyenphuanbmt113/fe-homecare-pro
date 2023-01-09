import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
import { fetchLoading } from "../../../store/actions/adminActions";
// import { RotatingTriangles } from "react-loader-spinner";
let settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
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
class Specialization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    this.props.setIsLoadingRedux(true);
    const res = await getSpecialty();
    if (res.data.EC === 0) {
      this.setState({
        dataSpecialty: res.data.DT || [],
      });
      this.props.setIsLoadingRedux(false);
    }
  }
  gotoDetail = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${id}`);
    }
  };
  handleClickSpecialty = (id) => {
    this.gotoDetail(id);
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className="section-container">
        <div className="section-content">
          <div className="section-top">
            <span className="title1">
              {" "}
              <FormattedMessage id="banner.Popular-Specialization"></FormattedMessage>
            </span>
            <span className="btn-section">
              {" "}
              <FormattedMessage id="banner.seemore"></FormattedMessage>
            </span>
          </div>
          <div className="slick-container">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => this.handleClickSpecialty(item.id)}>
                      <div className="img-container">
                        <img src={item.image} alt="" className="" />
                      </div>
                      <div className="mt-2 name-specialty">{item.name}</div>
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
    isLoadingRedux: state.admin.isLoadingRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoadingRedux: (flag) => dispatch(fetchLoading(flag)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialization)
);
