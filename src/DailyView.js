import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DailyViewEditor from "./DailyViewEditor.js";

const styles = theme => ({});

const defaultState = {
  entry: {
    goals: "",
    wins: "",
    lessonsLearned: "",
    morningGrateful: [],
    todaysTargets: [],
    eveningGrateful: []
  },
  mode: "readOnly"
};

class DailyView extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    if (props.selectedEntry) {
      this.state.entry = props.selectedEntry;
    }
    this.onChangeMode = this.onChangeMode.bind(this);
    this.onAfterSave = this.onAfterSave.bind(this);
  }

  onChangeMode(event) {
    this.setState({ mode: event.target.checked ? "edit" : "readOnly" });
  }

  onAfterSave(event) {
    this.setState({ mode: "readOnly" });
    if (this.props.afterSave) {
      this.props.afterSave();
    }
  }

  render() {
    const { classes } = this.props;
    const { entry, mode } = this.state;
    let content;
    if (mode === "edit") {
      content = (
        <DailyViewEditor selectedEntry={entry} afterSave={this.onAfterSave} />
      );
    } else {
      content = (
        <div>
          <h3>reading your journal</h3>
          <strong>this morning I am grateful for:</strong>
          <ol>
            {entry.morningGrateful.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ol>
          <strong>today's targets are:</strong>
          <ol>
            {entry.todaysTargets.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ol>
          <strong>this evening I am grateful for:</strong>
          <ol>
            {entry.eveningGrateful.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ol>
          <strong>goals</strong>
          <p>{entry.goals}</p>
          <strong>wins</strong>
          <p>{entry.wins}</p>
          <strong>lesson learned</strong>
          <p>{entry.lessonsLearned}</p>
        </div>
      );
    }

    return (
      <div>
        <h3>daily</h3>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "edit"}
              onChange={this.onChangeMode}
              value="checkedB"
              color="primary"
            />
          }
          label={mode === "edit" ? "editing" : "click to edit"}
        />
        {content}
      </div>
    );
  }
}

export default withStyles(styles)(DailyView);
