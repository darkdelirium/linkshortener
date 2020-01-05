import React from "react";
import { Link } from "react-router-dom";

export const LinksList = links => {
  const a = links.length;
  console.log(`linkslist ${links} ${a}`);
  if (!links.length) {
    return (
      <p>
        Nothing found, you can create your first link{" "}
        <Link to="/create">Here</Link>
      </p>
    );
  }
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Original Link</td>
            <td>Shorted Link</td>
            <td>Open</td>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={`/detail/${link._id}`}>Open</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
