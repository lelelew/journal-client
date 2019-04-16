import React, { Component } from "react";
import "./App.css";
import { getEntry, getAllEntries } from "./services.js";
import EntryForm from "./EntryForm.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
  }

  loadEntries() {
    (async () => {
      let selectedEntry = await getEntry(1);
      this.setState({ selectedEntry });
      let allEntries = await getAllEntries();
      this.setState({ allEntries });
    })();
  }

  componentDidMount() {
    this.loadEntries();
  }

  render() {
    const { allEntries } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <List>
              {allEntries &&
                allEntries.map((entry, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText
                        primary={entry.wins}
                        secondary={entry.lessons_learned}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <EntryForm afterSave={this.loadEntries} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
