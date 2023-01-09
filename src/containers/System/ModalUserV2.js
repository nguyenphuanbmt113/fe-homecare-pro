import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";
import { RotatingTriangles } from "react-loader-spinner";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./ModalUser.scss";
import CommonUtils from "../../utils/CommonUtils";
import {
  fetchAllUser,
  fetchCreateUser,
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
} from "../../store/actions/adminActions";
class ModalUserV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGenders: [],
      arrRoles: [],
      arrPositions: [],
      isOpen: false,
      imgName: "",
      previewImg: "",
      email: "",
      password: "",
      address: "",
      gender: "",
      role: "",
      position: "",
      phonenumber: "",
      firstName: "",
      lastName: "",
      image: "",
    };
  }
  //component did mount
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
  }
  //componen update
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderData !== this.props.genderData) {
      const arrGender = this.props.genderData;
      this.setState({
        arrGenders: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.roleData !== this.props.roleData) {
      const arrRole = this.props.roleData;
      this.setState({
        arrRoles: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.positionData !== this.props.positionData) {
      const arrPosition = this.props.positionData;
      this.setState({
        arrPositions: arrPosition,
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.usersData !== this.props.usersData) {
      this.setState({
        email: "",
        password: "",
        address: "",
        gender: "",
        role: "",
        position: "",
        phonenumber: "",
        firstName: "",
        lastName: "",
        image: "",
        imgName: "",
        previewImg: "",
      });
      this.props.closeModal();
    }
  }
  //onchnage image
  handleChangeImg = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const imgPrev = URL.createObjectURL(file);
      this.setState({
        previewImg: imgPrev,
        imgName: file.name,
        image: base64,
      });
    }
  };
  //showimage
  showImgPreview = () => {
    this.setState({ isOpen: true });
  };
  //check validation
  checkValidation = () => {
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
      "role",
      "position",
      "gender",
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
  //input chnage
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
    if (type === "ROLE") {
      this.setState({
        role: e.target.value,
      });
    }
    if (type === "POSITION") {
      this.setState({
        position: e.target.value,
      });
    }
    if (type === "GENDER") {
      this.setState({
        gender: e.target.value,
      });
    }
    if (type === "IMAGE") {
      this.setState({
        image: e.target.files,
      });
    }
  };
  //submit BTN
  handleSaveUser = () => {
    let isValid = this.checkValidation();
    if (isValid) {
      this.props.createUser({
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        phonenumber: this.state.phonenumber,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        image: this.state.image,
      });
    }
    // this.props.toggle();
  };
  //toggle
  toggle = () => {
    this.props.toggle();
  };
  closeBtn = () => {};
  render() {
    let isLoadingGender = this.props.isLoadingGender;
    const { arrPositions, arrRoles, arrGenders } = this.state;
    return (
      <>
        <Modal
          isOpen={this.props.isShow}
          toggle={() => this.toggle()}
          size={"lg"}
          centered>
          <ModalHeader toggle={() => this.toggle()}>Create User</ModalHeader>
          <ModalBody>
            <div className="userrd-container">
              {isLoadingGender === true && (
                <div>
                  <div className="loading">
                    <RotatingTriangles
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="rotating-triangels-loading"
                      wrapperStyle={{}}
                      wrapperClass="rotating-triangels-wrapper"
                      colors={["#fff", "#fff", "#fff"]}
                    />
                  </div>
                  <div className="overlay"></div>
                </div>
              )}
              <div className="user-body">
                <div className="container-add">
                  <div className="row g-3">
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.email"></FormattedMessage>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) => this.handleOnchnageInput(e, "EMAIL")}
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.password"></FormattedMessage>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={(e) =>
                          this.handleOnchnageInput(e, "PASSWORD")
                        }
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.firstName"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(e) =>
                          this.handleOnchnageInput(e, "FIRSTNAME")
                        }
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.lastName"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(e) =>
                          this.handleOnchnageInput(e, "LASTNAME")
                        }
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.phone"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.phonenumber}
                        onChange={(e) =>
                          this.handleOnchnageInput(e, "PHONENUMBER")
                        }
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.address"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.address}
                        onChange={(e) => this.handleOnchnageInput(e, "ADDRESS")}
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        <FormattedMessage id="menu.manage-user.gender"></FormattedMessage>
                      </label>
                      <select
                        className="form-select"
                        value={this.state.gender}
                        onChange={(e) => this.handleOnchnageInput(e, "GENDER")}>
                        {arrGenders &&
                          arrGenders.length > 0 &&
                          arrGenders.map((item) => {
                            return (
                              <option key={item.id} value={item.keyMap}>
                                {this.props.lang === "vi"
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.position"></FormattedMessage>
                      </label>
                      <select
                        className="form-select"
                        value={this.state.position}
                        onChange={(e) =>
                          this.handleOnchnageInput(e, "POSITION")
                        }>
                        {arrPositions &&
                          arrPositions.length > 0 &&
                          arrPositions.map((item) => {
                            return (
                              <option key={item.id} value={item.keyMap}>
                                {this.props.lang === "vi"
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="form-label">
                        {" "}
                        <FormattedMessage id="menu.manage-user.role"></FormattedMessage>
                      </label>
                      <select
                        className="form-select"
                        value={this.state.role}
                        onChange={(e) => this.handleOnchnageInput(e, "ROLE")}>
                        {arrRoles &&
                          arrRoles.length > 0 &&
                          arrRoles.map((item) => {
                            return (
                              <option key={item.id} value={item?.keyMap}>
                                {this.props.lang === "vi"
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label">
                        <FormattedMessage id="menu.manage-user.image"></FormattedMessage>
                      </label>
                      <div className="imgpreview">
                        <label className="input-label" htmlFor="taianh">
                          <span className="mr-2">Tải ảnh</span>
                          <i className="fas fa-upload ml-2"></i>
                        </label>
                        <input
                          type="file"
                          className="form-control opacity-0"
                          id="taianh"
                          onChange={(e) => this.handleChangeImg(e, "IMAGE")}
                          hidden
                        />
                        {this.state.previewImg && this.state.imgName && (
                          <>
                            <div
                              className="border img-preview"
                              onClick={() => this.showImgPreview()}>
                              <img src={this.state.previewImg} alt="" />
                            </div>
                            <div className="img-name">
                              {this.state?.imgName}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 border-t">
                <Button
                  color="primary"
                  onClick={() => this.handleSaveUser()}
                  className="px-3">
                  <FormattedMessage id="menu.manage-user.createUser"></FormattedMessage>
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
        {this.state.previewImg && this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    genderData: state.admin.genderData,
    roleData: state.admin.roleData,
    positionData: state.admin.positionData,
    isLoadingGender: state.admin.isLoadingGender,
    usersData: state.admin.usersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(fetchGenderStart()),
    getRoleStart: () => dispatch(fetchRoleStart()),
    getPositionStart: () => dispatch(fetchPositionStart()),
    createUser: (data) => dispatch(fetchCreateUser(data)),
    getAllUser: () => dispatch(fetchAllUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserV2);
