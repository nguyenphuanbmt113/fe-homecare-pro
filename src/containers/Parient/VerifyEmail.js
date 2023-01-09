import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyEmail } from "../../services/userService";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
    };
  }
  async componentDidMount() {
    if (this.props.location) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyEmail({
        token,
        doctorId,
      });
      if (res.data.EC === 0) {
        this.setState({
          statusVerify: true,
        });
      }
    }
  }
  render() {
    // const { systemMenuPath } = this.props;
    return (
      <>
        <div class="alert alert-success custom-alert" role="alert">
          confirm appointment successful
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
