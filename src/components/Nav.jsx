import React, { Component } from "react";
import "../App.css";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <ul>
          <li>Home</li>
          <li>Users</li>
          <li>Topics</li>
          <li>All Articles</li>
        </ul>
      </div>
    );
  }
}

export default Nav;
