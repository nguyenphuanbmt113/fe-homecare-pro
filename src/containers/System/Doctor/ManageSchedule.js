import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import { saveBulkDoctor } from "../../../services/userService";
import {
  fetchAllDoctor,
  fetchTimeDoctor,
} from "../../../store/actions/adminActions";
import "./ManageSchedule.scss";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      currentDate: "",
      allDoctors: [],
      scheduleDoctor: [],
    };
  }
  //habdleSelect
  handleSelect = (allDoctors) => {
    const options = [];
    allDoctors.forEach((ele) => {
      let labelVi = `${ele.firstName} ${ele.lastName}`;
      let labelEn = `${ele.lastName} ${ele.firstName}`;
      options.push({
        value: ele.id,
        label: this.props.lang === "vi" ? labelVi : labelEn,
      });
    });
    return options;
  };
  //life circle
  componentDidMount() {
    this.props.getAllDoctor();
    this.props.getTimeDoctor();
  }
  //did update
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelected = this.handleSelect(this.props.allDoctor);

      this.setState({
        allDoctors: dataSelected,
      });
    }
    if (prevProps.lang !== this.props.lang) {
      let dataSelected = this.handleSelect(this.props.allDoctor);
      this.setState({
        allDoctors: dataSelected,
      });
    }
    if (prevProps.scheduleDoctor !== this.props.scheduleDoctor) {
      this.props.scheduleDoctor.forEach((item, index) => {
        item.isActive = false;
      });
      this.setState({
        scheduleDoctor: this.props.scheduleDoctor,
      });
    }
  }
  //handleChange
  handleChange = async (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    });
  };
  //handle date picker
  handleChangeData = (data) => {
    this.setState({
      currentDate: data[0],
    });
  };
  //handle pick date to active
  handlePickDateActive = (dateId) => {
    let { scheduleDoctor } = this.state;
    scheduleDoctor.forEach((item) => {
      if (dateId === item.id) {
        item.isActive = !item.isActive;
      }
    });
    this.setState({
      scheduleDoctor: scheduleDoctor,
    });
  };
  //save submit
  handleSaveSchedule = async () => {
    let { selectedDoctor, scheduleDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid Date");
      return;
    }
    if (_.isEmpty(selectedDoctor)) {
      toast.error("Invalid Doctor");
      return;
    }
    let formateDate = new Date(currentDate).getTime().toString();
    if (scheduleDoctor && scheduleDoctor.length > 0) {
      let selectedTime = scheduleDoctor.filter((item, index) => {
        return item.isActive === true;
      });
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.forEach((item, index) => {
          let Obj = {};
          Obj.doctorId = selectedDoctor.value;
          Obj.date = formateDate;
          Obj.timeType = item.keyMap;
          result.push(Obj);
        });
      } else {
        toast.error("Invalid selected time");
      }
    }
    const res = await saveBulkDoctor({
      result,
      doctorId: selectedDoctor.value,
      date: formateDate,
    });
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      const no_active = this.state.scheduleDoctor.map((item) => {
        item.isActive = false;
        return item
      });
      this.setState({
        selectedDoctor: "",
        currentDate: "",
        scheduleDoctor: no_active,
      });
    }
  };

  render() {
    const { scheduleDoctor } = this.state;
    return (
      <>
        <div className="manage-schdule-container">
          <div className="m-s-title">
            <FormattedMessage id="menu.m-s.title"></FormattedMessage>
          </div>
          <div className="row">
            <div className="col-6 form-group">
              <div className="mb-2">
                {" "}
                <FormattedMessage id="menu.m-s.chooseDoctor"></FormattedMessage>
              </div>
              <div>
                <Select
                  placeholder={"Choose Doctor"}
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.allDoctors}
                />
              </div>
            </div>
            <div className="col-6 form-group">
              <div className="mb-2">
                {" "}
                <FormattedMessage id="menu.m-s.chooseDate"></FormattedMessage>
              </div>
              <div>
                <DatePicker
                  placeholder={"Choose Date"}
                  onChange={(data) => this.handleChangeData(data)}
                  className="form-control"
                  value={this.state.currentDate}></DatePicker>
              </div>
            </div>
            <div className="col-12 pick-hour mt-4">
              {scheduleDoctor &&
                scheduleDoctor.length > 0 &&
                scheduleDoctor.map((item, index) => {
                  return (
                    <div
                      className={
                        item.isActive === true ? "btn-time-active" : "btn-time"
                      }
                      onClick={() => this.handlePickDateActive(item.id)}>
                      {this.props.lang === "vi" ? item.valueVi : item.valueEn}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="btn-save"
              onClick={() => this.handleSaveSchedule()}>
              Lưu Thông Tin
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    scheduleDoctor: state.admin.scheduleDoctor,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(fetchAllDoctor()),
    getTimeDoctor: () => dispatch(fetchTimeDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
