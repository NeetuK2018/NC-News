import React, { Component } from "react";
import Error from "./Error";

class Auth extends Component {
  state = {
    username: "",
    errorStatus: null
  };
  render() {
    const { user, children } = this.props;
    const { username, errorStatus } = this.state;

    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    if (user.username) return children;
    else
      return (
        <section className="auth">
          <form onSubmit={this.handleSubmit}>
            <label>Enter Username:</label>
            <input onChange={this.handleChange} value={username} required />
            <button type="submit">Login</button>
          </form>
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
