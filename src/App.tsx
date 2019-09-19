import React, { Component } from "react";
// import "./App.css";
import { getAllEntries, getEntry } from "./services";
import DailyView from "./DailyView";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Link, navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import { Entry, Quote } from "./types";

const styles: any = (theme: any) => ({
  root: {},
  content: {
    height: "80vh",
    background: "white",
    overflow: "scroll",
    width: "100vw"
  },
  datepicker: {
    height: "20vh",
    background: "#EEE",
    overflow: "scroll",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    padding: 20
  },
  entryCard: {
    width: 200,
    marginRight: 20,
    cursor: "pointer"
  }
});

interface Props {
  date?: string;
  classes: any;
  path?: string;
}

interface State {
  allEntries: Array<Entry>;
  selectedEntry?: Entry;
}

class App extends Component<Props> {
  state: State = {
    allEntries: []
  };

  constructor(props: Props) {
    super(props);
    this.loadEntries = this.loadEntries.bind(this);
    this.loadEntry = this.loadEntry.bind(this);
    this.onAfterSave = this.onAfterSave.bind(this);
    this.onNewEntryClicked = this.onNewEntryClicked.bind(this);
  }

  async loadEntries() {
    let allEntries = await getAllEntries();
    this.setState({ allEntries });
  }

  async loadEntry() {
    const date = this.props.date;
    if (date) {
      const selectedEntry = await getEntry(date);
      this.setState({ selectedEntry });
    } else {
      this.setState({ selectedEntry: null });
    }
  }

  onNewEntryClicked() {
    navigate(`/entry/new`);
  }

  onCardClicked(entry: Entry) {
    navigate(`/entry/${entry.entryDate}`);
  }

  onAfterSave(entry: Entry) {
    navigate(`/entry/${entry.entryDate}`);
  }

  componentDidMount() {
    this.loadEntries();
    this.loadEntry();
  }

  componentDidUpdate(previousProps: Props, previousState: State) {
    if (previousProps.date !== this.props.date) {
      this.loadEntry();
    }
  }

  render() {
    const { allEntries, selectedEntry } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <DailyView
            key={selectedEntry ? selectedEntry.id : "new"}
            selectedEntry={selectedEntry}
            afterSave={this.onAfterSave}
          />
        </div>

        <div className={classes.datepicker}>
          {allEntries &&
            allEntries.map((entry, index) => {
              return (
                <Card
                  className={classes.entryCard}
                  key={index}
                  onClick={event => this.onCardClicked(entry)}
                >
                  <CardContent>
                    <Typography>
                      {entry.entryDate}
                      {`Wins - ${entry.wins}`}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}

          <Button
            variant="outlined"
            color="primary"
            onClick={this.onNewEntryClicked}
          >
            Start New Entry
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
