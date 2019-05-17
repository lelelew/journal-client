import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "@reach/router";
import About from "./About";
import Home from "./Home";
import NotFound from "./NotFound";

const routes = (
  <Router>
    <Home path="/" />
    <About path="/about" message="the Journal" />
    <App path="/entry/new" />
    <App path="/entry/:date" />
    <NotFound default />
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
