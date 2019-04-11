import React, { Component } from "react";
import "./App.css";
import { getEntry } from "./services.js";
import EntryForm from "./EntryForm.js";

class App extends Component {
  state = {};

  componentDidMount() {
    (async () => {
      let journalDayPage = await getEntry(1);
      this.setState(journalDayPage);
    })();
  }

  render() {
    const { wins } = this.state;
    return (
      <div>
        {wins} <EntryForm />
      </div>
    );
  }
}

export default App;
