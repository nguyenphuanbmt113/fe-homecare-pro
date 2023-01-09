import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageClinic from "../containers/System/Admin/Clinic/ManageClinic";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Admin/Specialty/ManageSpecialty";
import UserRd from "../containers/System/Admin/UserRd";
import UserManage from "../containers/System/UserManage";
import "./System.scss"
class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <>
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-rd" component={UserRd} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
