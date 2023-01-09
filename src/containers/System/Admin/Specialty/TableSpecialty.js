import React, { Component } from "react";
import { connect } from "react-redux";
import { getSpecialty } from "../../../../services/userService";
// import "./TableSpecialty.scss";
class TableSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: [],
    };
  }
  async componentDidMount() {
    const res = await getSpecialty();
    if (res.data.EC === 0) {
      this.setState({
        specialty: res.data.DT,
      });
    }
  }
  componentDidUpdate(prevProps) {}

  render() {
    const { specialty } = this.state;
    return (
      <>
        <div className="user-container ">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr className="bg-table text-white">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {specialty &&
                specialty.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialty);
