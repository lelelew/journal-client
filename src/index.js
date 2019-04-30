import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from "./About.js";
import Home from "./Home.js";
import history from "./history.js";

const routes = (
  <Router history={history}>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/entries/new" exact component={App} />
    <Route path="/entry/:date" component={App} />
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
