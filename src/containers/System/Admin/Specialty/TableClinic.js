import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic } from "../../../../services/userService";
// import "./TableClinic.scss";
class TableClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinis: [],
    };
  }
  async componentDidMount() {
    const res = await getAllClinic();
    if (res.data.EC === 0) {
      this.setState({
        clinis: res.data.DT,
      });
    }
  }
  componentDidUpdate(prevProps) {}

  render() {
    const { clinis } = this.state;
    return (
      <>
        <div className="user-container ">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr className="bg-table text-white">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {clinis &&
                clinis.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      {/* <td>{item.lastName}</td> */}
                      <td>
                        <div className="btn-container">
                          <button
                            className="bg-blue"
                            onClick={() => this.btnshowupdateuser(item)}>
                            <i className="far fa-edit"></i>
                          </button>
                          <button
                            className="bg-red"
                            onClick={() => this.handleDelete(item.id)}>
                            <i className="far fa-trash-alt "></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableClinic);
