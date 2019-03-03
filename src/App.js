import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import User from "./components/User";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import * as api from "./api";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import Users from "./components/Users";

class App extends Component {
  state = {
    user: null
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav user={user} />
        <Router className="main">
          <Users path="/users/*" />
          <Articles path="/topics/:topic/articles" />
        </Router>
        <SideBar />
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
