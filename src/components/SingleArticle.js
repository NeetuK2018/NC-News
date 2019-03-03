import React, { Component } from "react";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "../App.css";
import Voter from "./Voter";
import Moment from "moment";
import Comments from "./Comments";
import Error from "./Error";

class SingleArticle extends Component {
  state = {
    article: {},

    articleDeleted: false,
    errorStatus: null
  };
  render() {
    const { article, articleDeleted, errorStatus } = this.state;
    const { user } = this.props;
    console.log(article, "article");

    // if (isLoading) return <p>Loading...</p>;
    if (articleDeleted) return null;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    return (
      <div className="main">
        <div>
          <p>
            {article.title} {article.topic}{" "}
            {Moment(article.created_at, "YYYY-MM-DD-Thh:mm:ss").fromNow()}
          </p>

          <p> {article.body}</p>
          <p>by</p>
          <p>Author: {article.author}</p>
          {article.author === user.username ? (
            <p>Votes:{article.votes}</p>
          ) : (
            <Voter votes={article.votes} article_id={article.article_id} />
          )}

          {user.username === article.author && (
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
        this.setState({ article, isLoading: false });
      })
      .catch(err => {
        this.setState({ article: {}, errorStatus: err.response.status });
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
