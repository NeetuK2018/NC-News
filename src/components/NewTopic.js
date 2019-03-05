import React, { Component } from "react";
import * as api from "../api.js";
import AddArticle from "./AddArticle";

class NewTopic extends Component {
  state = {
    slug: "",
    description: "",
    newSlug: ""
  };
  render() {
    const { slug, description, newSlug } = this.state;
    const { user } = this.props;
    return (
      <div className="sidebar">
        <h3>Create New Topic!</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Topic Title:</label>
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={this.handleChange}
            required
          />
          <label onChange={this.handleChange}>Description</label>
          <input
            name="description"
            type="text"
            value={description}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Submit Topic</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
    api.addNewTopic(slug, description).then(topic => {
      console.log(topic);
      this.setState({ slug: "", description: "", newSlug: topic.slug });
    });
  };
}

export default NewTopic;
