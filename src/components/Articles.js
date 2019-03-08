import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";
import SortBy from "./SortBy";
// import Error from "./Error";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    errorStatus: false
  };
  render() {
    const { articles, errorStatus, isLoading } = this.state;
    if (isLoading) return <p>Loading..</p>;

    return (
      <div className="articles">
        <SortBy sortedArticles={this.sortedArticles} />
        {articles.map(article => (
          <p key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </p>
        ))}
        {articles.length === 0 && <p>There are no articles for this Topic.</p>}
        {errorStatus && (
          <p>
            This Topic doesn't exist. Why don't you you create one? Go to Post
            article and then choose New Topic from the dropdown!
          </p>
        )}
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
        this.setState({ articles, isLoading: false, errorStatus: false });
      })
      .catch(err => {
        this.setState({ errorStatus: true, isLoading: false });
      });
  };
  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
