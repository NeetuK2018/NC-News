import React, { Component } from "react";
import * as api from "../api.js";
import { Link } from "@reach/router";
// import SortBy from "./SortBy";

class SingleUserArticles extends Component {
  state = {
    articles: [],

    user: {},
    errorStatus: null
  };
  render() {
    const { articles, errorStatus } = this.state;

    if (errorStatus)
      return <p>Cannot find any Articles. This User doesn't exist.</p>;
    return (
      <div className="articlecard">
        {/* <SortBy sortedArticles={this.sortedArticles} /> */}
        {articles.map(article => (
          <p key={article.article_id}>
            <p>Topic: {article.topic}</p>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
            <p>
              by
              <p>{article.author}</p>
              <br />
            </p>{" "}
          </p>
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
        console.log(err, "hiya");
        this.setState({ errorStatus: true });
      });
  };
}
export default SingleUserArticles;
