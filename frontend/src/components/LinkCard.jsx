import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <React.Fragment>
      <h2>Link</h2>
      <p>
        Short URL:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Base URL:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Your Link followed: <strong>{link.clicks}</strong> time(s)
      </p>
      <p>
        Creation date:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </React.Fragment>
  );
};
