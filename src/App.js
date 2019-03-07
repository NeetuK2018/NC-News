import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import * as api from "./api";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import Users from "./components/Users";
import SingleUserArticles from "./components/SingleUserArticles";
import SingleArticle from "./components/SingleArticle";
import Auth from "./components/Auth";
import Side from "./components/Side";
import Home from "./components/Home";

class App extends Component {
  state = {
    user: {},
    isLoading: true,
    userError: false
  };
  render() {
    const { user, isLoading, userError } = this.state;
    if (isLoading) return <p>Loading..</p>;
    return (
      <div className="App">
        <Header />
        <Nav />
        <Auth errorStatus={userError} user={user} login={this.setUser}>
          <Router className="main">
            <Home path="/" />
            <Users path="/users" />
            <SingleUserArticles path="/users/:username/articles" />
            <Articles path="/topics/:topic/articles" />
            <Articles path="/articles" />
            <SingleArticle path="/articles/:article_id" user={user} />
          </Router>
        </Auth>
        <Side user={user} logout={this.clearUser} />
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ user: JSON.parse(user), isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };

  setUser = username => {
    api
      .getUserByUsername(username)
      .then(user => {
        this.setState({ user });
      })
      .catch(err => {
        this.setState({
          userError: true
        });
      });
  };

  clearUser = () => {
    navigate("/");
    this.setState({ user: "", userError: false });
  };
}
export default App;
