import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { useRoutes } from "../routes";

const App = () => {
  const routes = useRoutes(false);
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
