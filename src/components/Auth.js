import React, { Component } from "react";

class Auth extends Component {
  state = {
    username: ""
  };
  render() {
    const { user, children, errorStatus } = this.props;
    const { username } = this.state;

    if (user.username) return children;
    else
      return (
        <section className="auth">
          <form onSubmit={this.handleSubmit}>
            <label>Enter Username:</label>
            <input onChange={this.handleChange} value={username} required />
            <button type="submit">Login</button>
          </form>
          {errorStatus && (
            <p>This is not Username. Pick one from the list on the right.</p>
          )}
        </section>
      );
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({ username: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { login } = this.props;
    const { username } = this.state;
    login(username);
    this.setState({ username: "" });
  };
}

export default Auth;
