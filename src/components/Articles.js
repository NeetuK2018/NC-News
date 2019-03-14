import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";
import SortBy from "./SortBy";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    errorStatus: null
  };
  render() {
    const { articles, errorStatus, isLoading } = this.state;
    if (isLoading) return <p>Loading..</p>;
    if (errorStatus)
      return (
        <span>
          {" "}
          This Topic doesn't exist. Why don't you you create one? Go to
          Postarticle and then choose New Topic from the dropdown!
        </span>
      );

    return (
      <div className="articlecard">
        <SortBy sortedArticles={this.sortedArticles} />
        <br />
        {articles.map(article => (
          <span className="article" key={article.article_id}>
            <p>Topic: {article.topic}</p>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
            <br />
            by
            <br />
            {article.author}
            <br />
            <br />
            <br />
          </span>
        ))}

        {articles.length === 0 && <p>There are no articles for this Topic.</p>}
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
  }

  fetchArticles = () => {
    const { topic } = this.props;
    api
      .getArticles(topic)
      .then(articles => {
        this.setState({ articles, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: true });
      });
  };
  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
