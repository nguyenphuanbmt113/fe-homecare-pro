import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Navigator from "../../components/Navigator";
import * as actions from "../../store/actions";
import { changeLanguage } from "../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    //fire redux action
    this.props.setChangeLanguage(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (role === USER_ROLE.PATIENT) {
        if (this.props.history) {
          this.props.history.push("/home");
        }
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* language */}
        <div className="header-left">
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    setChangeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
