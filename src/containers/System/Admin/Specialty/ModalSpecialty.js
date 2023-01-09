import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import MarkDown from "../../MarkDown";
import { createNewSpecialty } from "../../../../services/userService";
import { toast } from "react-toastify";
class ModalSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      specialtyName: "",
      imageBase64: "",
      imagePreview: "",
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  //toggle create
  toggle = () => {
    this.props.toggle();
  };
  //handleMarkdown
  setContent = (contentHTML, contentMarkdown) => {
    this.setState({
      contentHTML: contentHTML,
      contentMarkdown: contentMarkdown,
    });
  };
  //convert file to base64
  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  //handleChangeName
  handleChangeName = (e) => {
    this.setState({
      specialtyName: e.target.value,
    });
  };
  //handleImageSpecialty
  handleImageSpecialty = async (e) => {
    let imageBase64 = await this.toBase64(e.target.files[0]);
    this.setState({
      imagePreview: imageBase64,
      imageBase64: imageBase64,
    });
  };
  //handleSubmit
  handleSubmit = async () => {
    const res = await createNewSpecialty(this.state);
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      this.toggle();
    } else {
      toast.error(res.data.EM);
    }
  };
  render() {
    return (
      <Modal
        dialoglassname="modal"
        isOpen={this.props.isShow}
        toggle={() => this.toggle()}
        size={"xl"}
        centered>
        <ModalHeader toggle={() => this.toggle()}>
          Thêm Thông tin Chuyên Khoa
        </ModalHeader>
        <ModalBody>
          <div className="px-4 pt-4 container-info row">
            <div className="form-group col-4 mb-3">
              <label className="mb-1">Tên Chuyên Khoa</label>
              <input
                type="text"
                className="form-control"
                value={this.state.specialtyName}
                onChange={(e) => this.handleChangeName(e)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <label className="mb-1">Hình Ảnh Chuyên Khoa</label>
              <div className="wrap-choose-image">
                <label
                  htmlFor="image-specialty"
                  className="btn-image title-specialty">
                  Chọn Ảnh
                </label>
                <input
                  id="image-specialty"
                  type="file"
                  className="form-control"
                  onChange={(e) => this.handleImageSpecialty(e)}
                />
              </div>
            </div>
          </div>
          {this.state?.imagePreview && (
            <div className="img-preview-specialty">
              <img src={this.state?.imagePreview} alt="" className="" />
            </div>
          )}
          <div className="px-4">
            <MarkDown
              setContent={this.setContent}
              contentMarkdown={this.state.contentMarkdown}></MarkDown>
          </div>
          <div className="mt-4 pb-4 px-4">
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSubmit()}>
              Lưu Thông Tin
            </Button>
            <Button
              color="secondary"
              onClick={() => this.toggle()}
              className="px-3 mx-3">
              Cancel
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSpecialty);
