import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.js";

// import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

console.log("react-webpack-template");

const element = <h1>Hello world</h1>;

console.log(element);

ReactDOM.render(<App />, document.getElementById("app"));
