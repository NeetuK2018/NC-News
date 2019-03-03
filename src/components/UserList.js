import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";

class UserList extends Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
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
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default UserList;
