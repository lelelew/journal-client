import React, { Component } from "react";
import "./App.css";
import { getAllEntries, getEntry } from "./services.js";
import DailyView from "./DailyView.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import history from "./history.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
});

class App extends Component {
  state = {
    allEntries: []
  };

  constructor(props) {
    super(props);
    this.loadEntries = this.loadEntries.bind(this);
    this.onAfterSave = this.onAfterSave.bind(this);
  }

  loadEntries() {
    (async () => {
      let allEntries = await getAllEntries();
      const date = this.props.match.params.date;
      if (date) {
        const selectedEntry = await getEntry(date);
        this.setState({ selectedEntry });
      }
      this.setState({ allEntries });
    })();
  }

  onListItemClicked(selectedEntry) {
    this.setState({ selectedEntry });
    console.log(selectedEntry);
  }

  onAfterSave(entry) {
    history.push(`/entry/${entry.entryDate}`);
  }

  componentDidMount() {
    this.loadEntries();
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
                        primary={entry.wins}
                        secondary={entry.lessonsLearned}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <DailyView
                key={selectedEntry && selectedEntry.id}
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
