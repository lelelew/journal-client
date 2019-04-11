import React, { Component } from "react";
import { saveEntry } from "./services.js";

class EntryForm extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    saveEntry(this.state);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Wins</h3>
        <textarea
          name="wins"
          value={this.state.wins}
          onChange={this.handleChange}
        />

        <textarea
          name="lessonsLearned"
          value={this.state.lessonsLearned}
          onChange={this.handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default EntryForm;
