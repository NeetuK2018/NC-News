import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import User from "./components/User";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <User />
        <Main />
        <SideBar />
        <Footer />
      </div>
    );
  }
}

export default App;
