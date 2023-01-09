import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import { connect } from "react-redux";
class ModalUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      phonenumber: "",
      address: "",
      firstName: "",
      lastName: "",
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.userDataUpdate?.id,
      email: this.props.userDataUpdate?.email,
      phonenumber: this.props.userDataUpdate?.phonenumber,
      address: this.props.userDataUpdate?.address,
      firstName: this.props.userDataUpdate?.firstName,
      lastName: this.props.userDataUpdate?.lastName,
    });
  }
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
    let arrInput = ["email", "firstName", "lastName", "address", "phonenumber"];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  handleBtnUpdateUser = () => {
    let isValid = this.checkValidation();
    if (isValid) {
      //call api with modal
      this.props.updatefnUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size={"lg"}
        centered>
        <ModalHeader toggle={() => this.toggle()} close={() => this.closeBtn()}>
          Update User
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
              {/* <div className="form-group col-6 mb-3">
                <label className="mb-1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  readonly="readonly"
                  value={this.state.password}
                  onChange={(e) => this.handleOnchnageInput(e, "PASSWORD")}
                />
              </div> */}
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
                onClick={() => this.handleBtnUpdateUser()}
                className="px-3">
                Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);
