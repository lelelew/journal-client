import React, { Component } from "react";
import "./App.css";
import { getAllEntries, getEntry } from "./services";
import DailyView from "./DailyView";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link, navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import { Entry, Quote } from "./types";

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
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

  onListItemClicked(entry: Entry) {
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
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <List>
              {allEntries &&
                allEntries.map((entry, index) => {
                  return (
                    <ListItem
                      key={index}
                      onClick={event => this.onListItemClicked(entry)}
                    >
                      <ListItemText
                        primary={entry.entryDate}
                        secondary={`Wins - ${entry.wins}`}
                      />
                    </ListItem>
                  );
                })}
            </List>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.onNewEntryClicked}
            >
              Start New Entry
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <DailyView
                key={selectedEntry ? selectedEntry.id : "new"}
                selectedEntry={selectedEntry}
                afterSave={this.onAfterSave}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
