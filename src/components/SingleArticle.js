import React, { Component } from "react";
import * as api from "../api.js";

import "../App.css";
import Voter from "./Voter";
import Moment from "moment";
import Comments from "./Comments";

class SingleArticle extends Component {
  state = {
    article: {},

    articleDeleted: false,
    errorStatus: null
  };
  render() {
    const { article, articleDeleted, errorStatus, isLoading } = this.state;
    const { user } = this.props;

    if (isLoading) return <p>Loading...</p>;
    if (articleDeleted) return null;
    if (errorStatus)
      return (
        <p>This article doesn't exist. Why don't you post a New Article</p>
      );
    return (
      <div className="articlecard">
        <div>
          <h2>{article.title}</h2>
          <h5>Topic: {article.topic}</h5>

          <h5>
            Created:
            {Moment(article.created_at, "YYYY-MM-DD-Thh:mm:ss").fromNow()}
          </h5>

          <p> {article.body}</p>
          <p>by</p>
          <p>Author: {article.author}</p>
          {article.author === user.username ? (
            <p>Votes:{article.votes}</p>
          ) : (
            <Voter votes={article.votes} article_id={article.article_id} />
          )}

          {article.author === user.username && (
            <button onClick={this.handleDelete}>Delete Article</button>
          )}
        </div>
        <Comments article_id={this.props.article_id} user={user} />
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  fetchArticles = () => {
    const { article_id } = this.props;
    api
      .getArticlesByArticleID(article_id)
      .then(article => {
        this.setState({ article, errorStatus: false });
      })
      .catch(err => {
        this.setState({ errorStatus: true });
      });
  };

  handleDelete = () => {
    const { article_id } = this.props;
    api
      .removeArticleById(article_id)
      .then(res => this.setState({ articleDeleted: true }));
  };
}

export default SingleArticle;
