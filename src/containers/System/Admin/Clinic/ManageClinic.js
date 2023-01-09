import React, { Component } from "react";
import { connect } from "react-redux";
import TableClinic from "../Specialty/TableClinic";
import "./ManageClinic.scss";
import ModalClinic from "./ModalClinic";
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }
  //toggle modal
  toggle = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };
  //handleOpenModal
  handleOpenModal = () => {
    this.setState({
      isShowModal: true,
    });
  };
  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="top-specialy">
            <div className="ms-title">Quản Lý Phòng Phám</div>
            <div
              className="btn-addnew-specialty"
              onClick={() => this.handleOpenModal()}>
              Create Clinic
            </div>
          </div>
          <div className="all-specialty"></div>
          <ModalClinic
            isShow={this.state.isShowModal}
            toggle={this.toggle}></ModalClinic>
          <div className="custom-margin">
            <TableClinic></TableClinic>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
