import React, { Component } from "react";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { CommonUtils } from "../../../utils";
import "./ModalRemedy.scss";
class ModalRemedy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
      imagePreview: "",
    };
  }
  //component did mount
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  //componen update
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  //toggle
  toggle = () => {
    this.props.toggle();
  };
  //handleChangeEmail
  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  //handlePickImage
  handlePickImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const imgPrev = URL.createObjectURL(file);
      this.setState({
        imagePreview: imgPrev,
        image: base64,
      });
    }
  };
  //send email
  handleSaveUser = () => {
    this.props.handleRemedy({
      email: this.state.email,
      image: this.state.image,
      timeType: this.props.dataModal.timeType,
      patientId: this.props.dataModal.patientId,
      doctorId: this.props.dataModal.doctorId,
      language: this.props.language,
      patientName: this.props.dataModal.patientName,
    });
  };
  render() {
    const { dataModal } = this.props;
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          // isOpen={true}
          toggle={() => this.toggle()}
          size={"lg"}
          centered>
          <ModalHeader toggle={() => this.toggle()}>Phiếu Xác Nhận</ModalHeader>
          <ModalBody>
            <div className="modal-body">
              <div className="row p-3">
                <div className="col-6 form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="form-control"
                    value={dataModal?.email}
                    // onChange={(e) => this.handleChangeEmail(e)}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Chọn File Thuốc</label>
                  <div className="file-container">
                    <label htmlFor="emailId" className="file-txt">
                      Chọn file
                    </label>
                    <input
                      id="emailId"
                      type="file"
                      className="form-control file-input"
                      onChange={(e) => this.handlePickImage(e)}
                    />
                  </div>
                </div>
                <div className="img-preview-remedy"></div>
              </div>
            </div>
            <div className="">
              <div className="p-3">
                <Button
                  color="primary"
                  onClick={() => this.handleSaveUser()}
                  className="px-3">
                  Send Remedy
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);
