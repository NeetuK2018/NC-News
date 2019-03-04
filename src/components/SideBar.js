import React from "react";
import UserList from "./UserList";
import { Link } from "@reach/router";

const SideBar = ({ user, logout }) => {
  if (user.username)
    return (
      <section className="sideBar">
        <h3>Welcome to NEWS {user.username}</h3>
        <img src={user.avatar_url} alt="Avatar" />
        <p>
          <Link to={`/users/${user.username}/articles`}>
            {user.usernames}'s Articles!
          </Link>
        </p>
        <button onClick={logout}>Log out</button>
      </section>
    );
  return (
    <div>
      <h4>Login with a Username </h4>
      <UserList />
    </div>
  );
};

export default SideBar;
