import React, { Component } from "react";
import * as api from "../api.js";

class SortBy extends Component {
  state = {
    sort_by: "created_at",
    order: "DESC",
    limit: "10",
    p: 1,
    nextPage: false
  };

  render() {
    const { p, nextPage } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="sortForm">
          <div>
            <label>Sort by:</label>

            <select
              id="sort_by"
              className="chosenSort"
              onChange={this.handleSortBy}
              defaultValue="created_at"
            >
              <option value="created_at" defaultValue>
                Date added
              </option>
              <option value="votes">Popularity</option>
              <option value="comment_count">Comments</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>
          <div>
            <label>Order:</label>
            <select
              id="order"
              className="chosenSort"
              onChange={this.handleOrder}
              defaultValue="DESC"
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
          <div>
            <label>Results per page:</label>
            <select
              id="limit"
              className="chosenSort"
              onChange={this.handleLimit}
              defaultValue="10"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <button type="submit" className="SubmitButton">
            Sort
          </button>
        </form>
        <div className="sortingBar">
          <button
            onClick={() => this.changePage(-1)}
            disabled={p < 2}
            className="responsiveButton"
          >
            Previous
          </button>
          <p className="">{p}</p>
          <button
            onClick={() => this.changePage(1)}
            disabled={nextPage}
            className="responsiveButton"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { sort_by, order, limit, p } = this.state;
    const { sortedArticles } = this.props;
    if (p !== prevState.p) {
      api.getSortedArticles(sort_by, order, limit, p).then(articles => {
        sortedArticles(articles);
      });
      api.getSortedArticles(sort_by, order, limit, p + 1).then(articles => {
        articles[0]
          ? this.setState({ nextPage: false })
          : this.setState({ nextPage: true });
      });
    }
  };

  handleSortBy = event => {
    this.setState({ sort_by: event.target.value });
  };

  handleOrder = event => {
    this.setState({ order: event.target.value });
  };

  handleLimit = event => {
    this.setState({ limit: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { sort_by, order, limit } = this.state;
    const { sortedArticles } = this.props;
    api
      .getSortedArticles(sort_by, order, limit, 1)
      .then(articles => {
        sortedArticles(articles);
      })
      .then(this.setState({ p: 1 }));
  };
  changePage = change => {
    this.setState(prevState => ({ p: prevState.p + change }));
  };
}

export default SortBy;
