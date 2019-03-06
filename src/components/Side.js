import React, { Component } from "react";
import UserList from "./UserList";
import { Link } from "@reach/router";
import AddArticle from "./AddArticle";
import * as api from "../api.js";
class Side extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    const { user, logout } = this.props;
    if (user.username)
      return (
        <div className="sideBar">
          <h3>Welcome to NEWS {user.username}</h3>
          <img src={user.avatar_url} alt="Avatar" />
          <p>
            <Link to={`/users/${user.username}/articles`}>
              {" "}
              {user.username}'s Articles!
            </Link>
          </p>
          <p>
            <button onClick={logout}>Log out</button>
          </p>
          <AddArticle user={user} topics={topics} />
        </div>
      );
    return (
      <div>
        <h4>Login with a Username </h4>
        <UserList />
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  fetchTopics = () =>
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        console.log(err);
      });
}

export default Side;
