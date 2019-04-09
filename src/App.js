import React, { Component } from "react";
import "./App.css";
import { getEntry } from "./services.js";

class App extends Component {
  state = {};

  componentDidMount() {
    (async () => {
      let journalDayPage = await getEntry(2);
      this.setState(journalDayPage);
    })();
  }

  render() {
    const { wins } = this.state;
    return <div>{wins}</div>;
  }
}

export default App;
