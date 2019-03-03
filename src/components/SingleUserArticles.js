import React, { Component } from "react";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "../App.css";

class SingleUserArticles extends Component {
  state = {
    articles: [],
    user: {}
  };
  render() {
    const { articles } = this.state;

    return (
      <div className="main">
        {articles.map(article => (
          <div key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchUsers();
  }
  fetchUsers = () => {
    const { username } = this.props;

    api
      .getArticlesByUsername(username)
      .then(articles => {
        this.setState({ articles, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default SingleUserArticles;
