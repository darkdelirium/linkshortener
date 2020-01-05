import React from "react";
import { BrowserRouter } from "react-router-dom";

import { useRoutes } from "../routes";
import { useAuth } from "../hooks/authHook";
import { AuthContext } from "../context/authContext";
import { Navbar } from "./navbar.jsx";
import { Loader } from "./Loader.jsx";

import "materialize-css";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          <div className="container">{routes}</div>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default App;
