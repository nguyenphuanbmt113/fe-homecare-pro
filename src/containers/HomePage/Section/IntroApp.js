import React, { Component } from "react";
import { connect } from "react-redux";
import "./IntroApp.scss";
import quanglinh from "../../../assets/image/ql.jpg";
class IntroApp extends Component {
  render() {
    // const { systemMenuPath } = this.props;
    return (
      <div className="intro-wrap">
        <div className="intro-container">
          <div className="content-left">
            <img src={quanglinh} alt="" />
          </div>
          <div className="content-right">
            <h2>Tải ứng dụng BookingCare</h2>
            <ul className="app-feature">
              <li>Đặt khám nhanh hơn</li>
              <li>Nhận thông báo từ hệ thống</li>
              <li>Nhận hướng dẫn đi khám chi tiết</li>
            </ul>
            <a className="app-link-auto" href="https://bookingcare.vn/app">
              Hoặc mở liên kết: <strong>https://bookingcare.vn/app</strong>
            </a>
            <div className="logo-container">
              <div className="img-container">
                <img
                  src="https://img.freepik.com/free-icon/google_318-278809.jpg"
                  alt=""
                />
              </div>
              <div className="img-container">
                <img
                  src="https://img.freepik.com/free-icon/google-maps_318-674231.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroApp);
