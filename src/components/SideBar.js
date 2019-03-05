import React from "react";
import UserList from "./UserList";
import { Link } from "@reach/router";
import AddArticle from "./AddArticle";

const SideBar = ({ user, logout }) => {
  if (user.username)
    return (
      <div className="sideBar">
        <h3>Welcome to NEWS {user.username}</h3>
        <img src={user.avatar_url} alt="Avatar" />
        <p>
          <Link to={`/users/${user.username}/articles`}>
            {" "}
            {user.username}'s Articles!
          </Link>
        </p>
        <p>
          <button onClick={logout}>Log out</button>
        </p>
        <AddArticle user={user} />
      </div>
    );
  return (
    <div>
      <h4>Login with a Username </h4>
      <UserList />
    </div>
  );
};

export default SideBar;
