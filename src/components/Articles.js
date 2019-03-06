import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";
import SortBy from "./SortBy";
import Error from "./Error";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    errorStatus: null
  };
  render() {
    const { articles, errorStatus, isLoading } = this.state;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    else if (isLoading) return <p>Loading..</p>;

    return (
      <div className="articles">
        <SortBy sortedArticles={this.sortedArticles} />

        {articles.map(article => (
          <p key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </p>
        ))}
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
        this.setState({ errorStatus: err.response.status });
      });
  };
  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
