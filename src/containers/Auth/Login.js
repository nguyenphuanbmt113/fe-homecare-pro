import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../services/userService";
import * as actions from "../../store/actions";
// import { userLoginSuccess } from "../../store/actions";
import "./Login.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMess: "",
    };
  }
  handleInputEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  //login submit
  handleLogin = async () => {
    this.setState({
      errorMess: "",
    });
    try {
      const res = await handleLogin(this.state.email, this.state.password);
      if (res.data.EC !== 0) {
        this.setState({
          errorMess: res.data.EM,
        });
      } else {
        this.props.userLoginSuccess(res.data.DT.res);
      }
    } catch (error) {
      this.setState({
        errorMess: error.response.data.EM,
      });
    }
  };
  //keydown
  handleKeydown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-bg">
        <div className="login-container">
          <div className="login-content row-auto">
            <div className="col-12 text-center txt-login">Sign In</div>
            <div></div>
            <div className="col-12">
              <div>
                <div className="form-group mb-3">
                  <label className="mb-2">Email</label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={(e) => this.handleInputEmail(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-2">Password</label>
                  <div>
                    <input
                      type="password"
                      className="form-control  shadow-none"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => this.handleInputPassword(e)}
                      onKeyDown={(e) => this.handleKeydown(e)}
                    />
                    {/* <i class="fa-solid fa-eye"></i> */}
                  </div>
                </div>
                <div className="col-12 text-center mt-3">
                  <button
                    className="btn btn-primary px-4 col-12"
                    onClick={() => this.handleLogin()}>
                    Login
                  </button>
                </div>
                <div className="col-12 txt-err">{this.state?.errorMess}</div>
                <div className="col-12 mt-3 text-forgot">
                  forgot the password?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
