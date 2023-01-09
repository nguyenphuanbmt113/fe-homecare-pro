import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../HomePage.scss";
class AboutSection extends Component {
  render() {
    return (
      <>
        <div className="section-container section-about">
          <div className="section-content">
            <div className="section-top">
              <span className="title1">
                {" "}
                <FormattedMessage id="banner.About"></FormattedMessage>
              </span>
            </div>
            <div className="about-content">
              <div>
                <iframe
                  width="100%"
                  height="280"
                  src="https://www.youtube.com/embed/7tiR7SI4CkI"
                  title="BookingCare trên VTV1 ngày 21/02/2018 - Chương trình Cà phê khởi nghiệp"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
              <div className="about-title">
                Cho đến nay, khoảng 80% người dùng có phản hồi tích cực và 20%
                khách hàng phản hồi chưa tốt khi sử dụng ứng dụng. để đạt được
                những con số đó cũng là cả một chặng đường dài. Người sáng lập
                BookingCare chia sẻ: Với một dịch vụ tương đối mới, việc tiếp
                nhận của thị trường, nhận thức về thương hiệu và uy tín chưa
                cao.
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutSection);
