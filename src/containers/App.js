import { ConnectedRouter as Router } from "connected-react-router";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { history } from "../redux";
import "react-toastify/dist/ReactToastify.css";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import System from "../routes/System";
import Login from "./Auth/Login";
import HomePage from "./HomePage/HomePage";
import DetailDoctor from "./Parient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import VerifyEmail from "./Parient/VerifyEmail";
import DetailSpecialty from "./Parient/Specialty/DetailSpecialty";
import DetailClinic from "./System/Admin/Clinic/DetailClinic";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    const { isLoadingRedux } = this.props;
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <span className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
                <Route
                  path={path.DOCTOR}
                  component={userIsAuthenticated(Doctor)}
                />
              </Switch>
            </span>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
