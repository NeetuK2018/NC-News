import React from "react";

const Error = ({ errorStatus }) => {
  return (
    <div className="error">
      <h3>Error {errorStatus}</h3>
      <p>
        <h1> OOps! Something has gone wrong..</h1>;
      </p>
    </div>
  );
};

export default Error;
