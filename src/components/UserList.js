import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";

class UserList extends Component {
  state = {
    users: [],
    isLoading: true,
    errorStatus: null
  };
  render() {
    const { users, isLoading, errorStatus } = this.state;

    if (isLoading) return <p>Loading..</p>;
    if (errorStatus) return <p>User doesn't exist</p>;
    return (
      <div className="userlist">
        {users.map(user => (
          <div key={user.username}>
            <img src={user.avatar_url} alt="Avatar" />
            <p>
              <Link to={`/users/${user.username}/articles`}>
                {user.username}
              </Link>
            </p>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: true });
      });
  };
}

export default UserList;
