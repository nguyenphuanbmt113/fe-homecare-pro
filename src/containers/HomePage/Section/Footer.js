import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
class Footer extends Component {
  render() {
    return (
      <div className="footer-wrap">
        <div className="footer-container">
          <div className="content-left">
            <h2>Công ty Cổ phần Công nghệ HomeCare</h2>
            <p>
              <span className="bt-g bt-g-diadiem"></span>
              28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
            </p>
            <p>
              <span className="bt-g bt-g-dongy"></span>
              ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
            </p>

            <div className="logo-container">
              <div className="img-container">
                <img
                  src="https://img.freepik.com/free-icon/facebook_318-566730.jpg"
                  alt=""
                />
              </div>
              <div className="img-container">
                <img
                  src="https://img.freepik.com/free-icon/youtube_318-804673.jpg"
                  alt=""
                />
              </div>
              <div className="img-container">
                <img
                  src="https://img.freepik.com/free-icon/google-play_318-674232.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="content-mid">
            <ul>
              <li>
                <a href="/hop-tac-voi-bookingcare">Liên hệ hợp tác</a>
              </li>
              <li>
                <a href="/goi-chuyen-doi-so">Gói chuyển đổi số doanh nghiệp</a>
              </li>
              <li>
                <a href="/tuyen-dung">Tuyển dụng</a>
              </li>
              <li>
                <a href="/benh-nhan-thuong-hoi">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="/page/dieu-khoan-su-dung-p7">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="/page/chinh-sach-bao-mat-p8">Chính sách Bảo mật</a>
              </li>
              <li>
                <a href="/thong-tin/quy-trinh-ho-tro-giai-quyet-khieu-nai-p13">
                  Quy trình hỗ trợ giải quyết khiếu nại
                </a>
              </li>
              <li>
                <a href="/site/quyche">Quy chế hoạt động</a>
              </li>
            </ul>
          </div>
          <div className="content-right">
            <div>
              <div className="strong">Trụ sở tại Hà Nội</div>
              <div>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
            </div>
            <div>
              <div className="strong">Văn phòng tại TP Hồ Chí Minh</div>
              <div>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
            </div>
            <div>
              <div className="strong">Hỗ trợ khách hàng</div>
              <div>support@bookingcare.vn (7h - 18h)</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
