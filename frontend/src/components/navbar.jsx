import React, { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <Link to="/" className="brand-logo">
          Link Shorterer
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create a new Link</NavLink>
          </li>
          <li>
            <NavLink to="/links">List all links</NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={logoutHandler}>
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
