import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";

class Articles extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;

    return (
      <div className="main">
        {topics.map(topic => (
          <span key={topic.slug}>
            <Link to={`/topics/${topic.slug}/articles`}>{topic.slug} </Link>
          </span>
        ))}
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

export default Articles;
