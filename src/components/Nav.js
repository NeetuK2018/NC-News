import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;

    return (
      <div className="nav links">
        <ul>
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <Link to={`/users`}>
            <li>Users</li>
          </Link>

          <Link to={`/articles`}>
            <li>Articles</li>
          </Link>
          <Link to={`/topics/topic/articles`} />
          <h3>Topics:</h3>

          {topics.map(topic => (
            <span key={topic.slug}>
              <Link className="links" to={`/topics/${topic.slug}/articles`}>
                {topic.slug}{" "}
              </Link>
            </span>
          ))}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Nav;
