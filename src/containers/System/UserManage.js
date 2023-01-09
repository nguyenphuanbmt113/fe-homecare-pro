import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createNewUser,
  deleteUser,
  handleGetAllUser,
  updateUser,
} from "../../services/userService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalUser from "./ModalUser";
import "./usermanage.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      userDataUpdate: {},
      showmodalcreate: false,
      showmodalupdate: false,
    };
  }
  //fn getall user
  getAllUserApi = async () => {
    let res = await handleGetAllUser();
    if (res.data.EC === 0) {
      this.setState({
        userData: res.data.data,
      });
    }
  };
  async componentDidMount() {
    await this.getAllUserApi();
  }
  //handle add new user
  handleAddNewUser = () => {
    this.setState({
      showmodalcreate: true,
    });
  };
  //btnshowupdateuser
  btnshowupdateuser = (data) => {
    this.setState({
      showmodalupdate: true,
      userDataUpdate: data,
    });
  };
  //toggle modal
  toggleUserModal = () => {
    this.setState({
      showmodalcreate: !this.state.showmodalcreate,
    });
  };
  //toggle update modal
  toggleUpdateUserModal = () => {
    this.setState({
      showmodalupdate: !this.state.showmodalupdate,
    });
  };
  //create user
  createnewUser = async (data) => {
    try {
      const res = await createNewUser(data);
      if (res.data.EC === 0) {
        await this.getAllUserApi();
        this.toggleUserModal();
        this.setState({});
      } else {
        alert(res.data.EM);
      }
    } catch (error) {}
  };
  //update user
  updatefnUser = async (data) => {
    try {
      const res = await updateUser(data);
      if (res.data.EC === 0) {
        await this.getAllUserApi();
        this.toggleUpdateUserModal();
      } else {
        alert(res.data.EM);
      }
    } catch (error) {}
  };
  //delete user by id fn
  handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.EC === 0) {
        await this.getAllUserApi();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  render() {
    let userData = this.state.userData;
    return (
      <div className="user-container ">
        <div className="btn-create" onClick={() => this.handleAddNewUser()}>
          Create User
        </div>
        <div className="title text-center mb-3">Magane User</div>
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
            {userData &&
              userData.map((item, index) => {
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
        <ModalUser
          isOpen={this.state.showmodalcreate}
          toggle={this.toggleUserModal}
          createnewUser={this.createnewUser}></ModalUser>
        {this.state.showmodalupdate === true && (
          <ModalUpdateUser
            isOpen={this.state.showmodalupdate}
            userDataUpdate={this.state.userDataUpdate}
            updatefnUser={this.updatefnUser}
            toggle={this.toggleUpdateUserModal}></ModalUpdateUser>
        )}
      </div>
    );
  }
}

/*
life Cycle
1. run construct => init state
2. run did mount(set state) 
3. render
4. did update when change 
*/

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
