import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phonenumber: "",
      address: "",
      firstName: "",
      lastName: "",
    };
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggle();
  };
  handleOnchnageInput = (e, type) => {
    if (type === "EMAIL") {
      this.setState({
        email: e.target.value,
      });
    }
    if (type === "PASSWORD") {
      this.setState({
        password: e.target.value,
      });
    }
    if (type === "FIRSTNAME") {
      this.setState({
        firstName: e.target.value,
      });
    }
    if (type === "LASTNAME") {
      this.setState({
        lastName: e.target.value,
      });
    }
    if (type === "PHONENUMBER") {
      this.setState({
        phonenumber: e.target.value,
      });
    }
    if (type === "ADDRESS") {
      this.setState({
        address: e.target.value,
      });
    }
  };
  //validation
  checkValidation = () => {
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter", +arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleBtnAddnewUser = () => {
    let isValid = this.checkValidation();
    if (isValid) {
      //call api with modal
      this.props.createnewUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size={"lg"}
        centered>
        <ModalHeader toggle={() => this.toggle()}>
          Create User
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <form className="row">
              <div className="form-group col-6 mb-3">
                <label className="mb-1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnchnageInput(e, "EMAIL")}
                />
              </div>
              <div className="form-group col-6 mb-3">
                <label className="mb-1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(e) => this.handleOnchnageInput(e, "PASSWORD")}
                />
              </div>
              <div className="form-group col-6 mb-3">
                <label className="mb-1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(e) => this.handleOnchnageInput(e, "FIRSTNAME")}
                />
              </div>
              <div className="form-group col-6 mb-3">
                <label className="mb-1">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(e) => this.handleOnchnageInput(e, "LASTNAME")}
                />
              </div>
              <div className="form-group col-6">
                <label className="mb-1">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnchnageInput(e, "ADDRESS")}
                />
              </div>
              <div className="form-group col-6">
                <label className="mb-1">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phonenumber}
                  onChange={(e) => this.handleOnchnageInput(e, "PHONENUMBER")}
                />
              </div>
            </form>
            <div className="mt-4">
              <Button
                color="primary"
                onClick={() => this.handleBtnAddnewUser()}
                className="px-3">
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => this.toggle()}
                className="px-3 mx-3">
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
