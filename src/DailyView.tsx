import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DailyViewEditor from "./DailyViewEditor";
import { newQuote } from "./services";
import dayjs from "dayjs";
import { Entry, Quote } from "./types";

const styles = (theme: any) => ({});

const defaultState = {
  entry: {
    goals: "",
    wins: "",
    lessonsLearned: "",
    morningGrateful: [],
    todaysTargets: [],
    eveningGrateful: [],
    entryDate: dayjs(Date.now()).format("YYYY-MM-DD")
  },
  mode: "readOnly",
  quote: {
    quote: "get ready for wisdom",
    source: "journalapp"
  }
};

interface Props {
  selectedEntry?: Entry;
  afterSave: (entry: Entry) => void;
  classes: any;
}

interface State {
  entry: Entry;
  mode: string;
  quote: Quote;
}

class DailyView extends Component<Props> {
  state: State = Object.assign({}, defaultState);

  constructor(props: Props) {
    super(props);
    if (props.selectedEntry) {
      this.state.entry = props.selectedEntry;
    } else {
      this.state.entry = Object.assign({}, defaultState.entry);
      this.state.mode = "edit";
    }
    this.onChangeMode = this.onChangeMode.bind(this);
    this.onAfterSave = this.onAfterSave.bind(this);
    this.loadRandomQuote = this.loadRandomQuote.bind(this);
  }

  async loadRandomQuote() {
    const quote = await newQuote();
    this.setState({ quote });
  }

  componentDidMount() {
    this.loadRandomQuote();
  }

  onChangeMode(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ mode: event.target.checked ? "edit" : "readOnly" });
  }

  onAfterSave(entry: Entry) {
    const { afterSave } = this.props;
    this.setState({ mode: "readOnly" });
    if (afterSave) {
      afterSave(entry);
    }
  }

  render() {
    const { classes } = this.props;
    const { entry, mode, quote } = this.state;
    const { entryDate } = entry;
    let content;
    if (mode === "edit") {
      content = (
        <DailyViewEditor
          key={entry.id ? entry.id : "new"}
          selectedEntry={entry}
          afterSave={this.onAfterSave}
        />
      );
    } else {
      content = (
        <div>
          <h3>
            {entryDate && dayjs(entryDate).format("MM/DD/YYYY")} Reading Your
            Journal
          </h3>

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
          <blockquote>
            {quote.quote}
            <br />
            &mdash; {quote.source}
          </blockquote>
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
