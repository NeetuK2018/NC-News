import React from "react";
// import { Link } from "@reach/router";

const Error = ({ errorStatus, message }) => {
  return (
    <div className="error">
      <h3>Error {errorStatus}</h3>
      <h1> OOps! Something has gone wrong..</h1>;<p>{message}</p>
    </div>
  );
};

export default Error;
