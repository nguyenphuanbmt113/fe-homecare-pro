import React, { Component } from "react";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchCreateUser } from "../../../store/actions/adminActions";
import MarkDown from "../MarkDown";
import ModalMarkDown from "../ModalMarkDown";
import ModalUserUpdateV2 from "../ModalUserUpdateV2";
import ModalUserV2 from "../ModalUserV2";
// import ModalUserV2 from "../ModalUserV2";
import "./UserRd.scss";
import "./ManageDoctor.scss";
import TableDoctor from "./TableDoctor";
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isShowUpdate: false,
      isShowMarkDown: false,
      userUpdate: {},
    };
  }
  //toggle open and close
  toggle = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  toggleMarkDown = () => {
    this.setState({
      isShowMarkDown: !this.state.isShowMarkDown,
    });
  };

  //close modal
  closeModal = () => {
    this.setState({
      isShow: false,
    });
  };
  closeModalMarkDown = () => {
    this.setState({
      isShowMarkDown: false,
    });
  };
  toggleUpdateModal = () => {
    this.setState({
      isShowUpdate: !this.state.isShowUpdate,
    });
  };
  getUpdateModal = (item) => {
    this.setState({
      isShowUpdate: true,
      userUpdate: item,
    });
  };

  render() {
    return (
      <>
        <div className="container-header-manage">
          <div className="title-header mb-1">
            <FormattedMessage id="menu.admin.manage-doctor"></FormattedMessage>
          </div>
          <div>
            <button onClick={() => this.toggle()} className="btn-add mr-2">
              <FormattedMessage id="menu.manage-user.Create-User"></FormattedMessage>
            </button>
            <button className="btn-add" onClick={() => this.toggleMarkDown()}>
              <FormattedMessage id="menu.manage-user.createMarkdown"></FormattedMessage>
            </button>
          </div>
        </div>
        <TableDoctor></TableDoctor>
        {this.state.isShow === true && (
          <ModalUserV2
            isShow={this.state.isShow}
            toggle={this.toggle}
            closeModal={this.closeModal}></ModalUserV2>
        )}
        {this.state.isShowUpdate === true && (
          <ModalUserUpdateV2
            isShow={this.state.isShowUpdate}
            toggle={this.toggleUpdateModal}
            userUpdate={this.state.userUpdate}></ModalUserUpdateV2>
        )}
        {this.state.isShowMarkDown === true && (
          <ModalMarkDown
            isShow={this.state.isShowMarkDown}
            toggle={this.toggleMarkDown}></ModalMarkDown>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (data) => dispatch(fetchCreateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
