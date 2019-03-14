import React, { Component } from "react";
import Error from "./Error";
import * as api from "../api.js";

class Addcomment extends Component {
  state = {
    body: "",
    errorStatus: null,
    isLoading: false
  };
  render() {
    const { body, errorStatus, isLoading } = this.state;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    else if (isLoading) return <p>Loading..</p>;
    return (
      <div className="addcomment">
        <form onSubmit={this.handleSubmit}>
          <h2>
            <label>Add a Comment </label>
          </h2>
          <textarea
            type="text"
            value={body}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { body, isLoading } = this.state;
    const { article_id, user, addComment } = this.props;

    api
      .addCommentByArticleID(body, article_id, user, isLoading)
      .then(comment => {
        addComment(comment);
        this.setState({ body: "", isLoading: false });
      })
      .catch(err => {
        this.setState({ errorStatus: err.response.status });
      });
  };
}

export default Addcomment;
