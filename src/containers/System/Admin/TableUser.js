import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/userService";
import { fetchAllUser } from "../../../store/actions/adminActions";
import "./TableUser.scss";
class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    this.props.getAllUser();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.usersData !== this.props.usersData) {
      this.setState({
        users: this.props.usersData,
      });
    }
  }
  //delete user by id fn
  handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.EC === 0) {
        toast.success(res?.data?.EM);
        await this.props.getAllUser();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  //update
  btnshowupdateuser = (item) => {
    this.props.getUpdateModal(item);
  };
  handlePageClick = (event) => {
    console.log(event.selected + 1);
    this.setState(
      {
        page: event.selected + 1,
      },
      () => {
        this.props.getUserPara({
          limit: this.state.limit,
          page: this.state.page,
        });
      }
    );
  };
  render() {
    let users = this.state.users;
    console.log(">>>>", this.props.usersData);
    console.log("users", users);
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    usersData: state.admin.usersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(fetchAllUser()),
    // getUserPara: (query) => dispatch(fetchUserParameter(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
