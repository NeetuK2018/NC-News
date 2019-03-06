import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";
import Error from "./Error";

class UserList extends Component {
  state = {
    users: [],
    isLoading: true,
    errorStatus: null
  };
  render() {
    const { users, isLoading, errorStatus } = this.state;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    if (isLoading) return <p>Loading..</p>;
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
        this.setState({ errorStatus: err.response.status });
      });
  };
}

export default UserList;
