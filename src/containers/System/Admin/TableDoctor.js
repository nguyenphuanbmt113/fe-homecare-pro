import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { fetchDoctorParameter } from "../../../store/actions/adminActions";
import "./TableDoctor.scss";
class TableDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      limit: 2,
      totalPageDoctors: 0,
    };
  }
  async componentDidMount() {
    this.props.getDoctorPara({
      limit: this.state.limit,
      page: this.state.page,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.doctorsDataPara !== this.props.doctorsDataPara) {
      this.setState({
        users: this.props.doctorsDataPara,
      });
    }
    if (prevProps.totalPageDoctors !== this.props.totalPageDoctors) {
      this.setState({
        totalPageDoctors: this.props.totalPageDoctors,
      });
    }
  }
  handlePageClick = (event) => {
    console.log(event.selected + 1);
    this.setState(
      {
        page: event.selected + 1,
      },
      () => {
        this.props.getDoctorPara({
          limit: this.state.limit,
          page: this.state.page,
        });
      }
    );
  };
  render() {
    let users = this.state.users;
    console.log(this.props.doctorsDataPara);
    /* 
            doctorsDataPara: action.data.rows,
        totalPageDoctors: action.data.count,
    */
    return (
      <>
        <div className="user-container ">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr className="bg-table text-white">
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Address</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
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
        <div className="parameter">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={this.handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={this.state.totalPageDoctors}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }
}
/*
  doctorsDataPara: [],
  totalPageDoctors: 0,

          doctorsDataPara: action.data.rows,
        totalPageDoctors: action.data.count,
 */
const mapStateToProps = (state) => {
  return {
    doctorsDataPara: state.admin.doctorsDataPara,
    totalPageDoctors: state.admin.totalPageDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorPara: (query) => dispatch(fetchDoctorParameter(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDoctor);
