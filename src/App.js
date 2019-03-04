import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import * as api from "./api";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import Users from "./components/Users";
import SingleUserArticles from "./components/SingleUserArticles";
import SingleArticle from "./components/SingleArticle";
import Auth from "./components/Auth";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav />
        <Auth user={user} login={this.setUser}>
          <Router className="main">
            <Users path="/users" />
            <SingleUserArticles path="/users/:username/articles" />
            <Articles path="/topics/:topic/articles" />
            <Articles path="/articles" />
            <SingleArticle path="/articles/:article_id" user={user} />
          </Router>
        </Auth>
        <SideBar user={user} logout={this.clearUser} />
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    const retrievedState = localStorage.getItem("state");
    if (retrievedState) {
      this.setState(JSON.parse(retrievedState));
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  setUser = username => {
    api.getUserByUsername(username).then(user => {
      this.setState({ user });
    });
  };

  clearUser = () => {
    navigate("/");
    this.setState({ user: "" });
  };
}
export default App;
