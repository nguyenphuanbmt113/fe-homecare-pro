import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
class Doctor extends Component {
  render() {
    // const { systemMenuPath } = this.props;
    return (
      <>
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctorAdmin/manage-schedule"
                component={ManageSchedule}
              />
              <Route
                path="/doctorAdmin/manage-patient"
                component={ManagePatient}
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
