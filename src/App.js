import React, { Component } from "react";
import "./App.css";
import { getDay } from "./services.js";

class App extends Component {
  state = {};

  componentDidMount() {
    (async () => {
      let journalDayPage = await getDay();
      this.setState(journalDayPage);
    })();
  }

  render() {
    const { wins } = this.state;
    return <div>{wins}</div>;
  }
}

export default App;
