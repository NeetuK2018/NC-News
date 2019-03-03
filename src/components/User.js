import React, { Component } from "react";
import "../App.css";

class currentUser extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <h2> user</h2>
      </div>
    );
  }
}

export default currentUser;
