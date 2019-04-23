import React, { Component } from "react";
import { saveEntry } from "./services.js";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Snackbar, Typography } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  errorIcon: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  icon: {
    fontSize: 20
  },

  message: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const defaultState = {
  isSubmitting: false,
  hasError: false,
  entry: {
    goals: "",
    wins: "",
    lessonsLearned: ""
  }
};

class DailyViewEditor extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCloseError = this.onCloseError.bind(this);
    if (props.selectedEntry) {
      this.state.entry = props.selectedEntry;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    try {
      await saveEntry(this.state.entry);
      this.setState(defaultState);
      const { afterSave } = this.props;
      if (afterSave) {
        afterSave();
      }
    } catch (error) {
      this.setState({ hasError: true });
    }
  }

  onCloseError(event) {
    this.setState({ hasError: false });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const entry = this.state.entry;
    if (name.indexOf("morningGrateful") !== -1) {
      const index = name.charAt(name.length - 1);
      entry.morningGrateful[index] = value;
    } else if (name.indexOf("todaysTargets") !== -1) {
      const index = name.charAt(name.length - 1);
      entry.todaysTargets[index] = value;
    } else if (name.indexOf("eveningGrateful") !== -1) {
      const index = name.charAt(name.length - 1);
      entry.eveningGrateful[index] = value;
    } else {
      entry[name] = value;
    }
    this.setState({ entry });
  }

  render() {
    const { classes } = this.props;
    const { entry, isSubmitting, hasError } = this.state;

    return (
      <div>
        <Typography variant="subtitle1">
          This morning I'm grateful for:
        </Typography>
        <TextField
          name="morningGrateful0"
          id="filled-multiline-flexible"
          label="#1"
          multiline
          rowsMax="2"
          value={entry.morningGrateful[0] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#1"
          variant="filled"
        />

        <TextField
          name="morningGrateful1"
          id="filled-multiline-flexible"
          label="#2"
          multiline
          rowsMax="2"
          value={entry.morningGrateful[1] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#2"
          variant="filled"
        />

        <TextField
          name="morningGrateful2"
          id="filled-multiline-flexible"
          label="#3"
          multiline
          rowsMax="2"
          value={entry.morningGrateful[2] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#3"
          variant="filled"
        />

        <Typography variant="subtitle1">Today's Targets:</Typography>
        <TextField
          name="todaysTargets0"
          id="filled-multiline-flexible"
          label="#1"
          multiline
          rowsMax="2"
          value={entry.todaysTargets[0] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#1"
          variant="filled"
        />

        <TextField
          name="todaysTargets1"
          id="filled-multiline-flexible"
          label="#2"
          multiline
          rowsMax="2"
          value={entry.todaysTargets[1] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#2"
          variant="filled"
        />

        <TextField
          name="todaysTargets2"
          id="filled-multiline-flexible"
          label="#3"
          multiline
          rowsMax="2"
          value={entry.todaysTargets[2] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#3"
          variant="filled"
        />

        <Typography variant="subtitle1">
          This evening I'm grateful for:
        </Typography>
        <TextField
          name="eveningGrateful0"
          id="filled-multiline-flexible"
          label="#1"
          multiline
          rowsMax="2"
          value={entry.eveningGrateful[0] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#1"
          variant="filled"
        />

        <TextField
          name="eveningGrateful1"
          id="filled-multiline-flexible"
          label="#2"
          multiline
          rowsMax="2"
          value={entry.eveningGrateful[1] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#2"
          variant="filled"
        />

        <TextField
          name="eveningGrateful2"
          id="filled-multiline-flexible"
          label="#3"
          multiline
          rowsMax="2"
          value={entry.eveningGrateful[2] || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="#3"
          variant="filled"
        />

        <TextField
          name="goals"
          id="filled-multiline-flexible"
          label="Goals"
          multiline
          rowsMax="4"
          value={entry.goals || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="put your goals here"
          variant="filled"
        />

        <TextField
          name="wins"
          id="filled-multiline-flexible"
          label="Wins"
          multiline
          rowsMax="4"
          value={entry.wins || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="put your wins here"
          variant="filled"
        />

        <TextField
          name="lessonsLearned"
          id="filled-multiline-flexible"
          label="Lessons Learned"
          multiline
          rowsMax="4"
          value={entry.lessonsLearned || ""}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          helperText="put your lessons learned here"
          variant="filled"
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.onSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>

        <Snackbar
          open={hasError}
          autoHideDuration={6000}
          onClose={this.onCloseError}
        >
          <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon className={classes.errorIcon} />
                Error saving entry. Try again later.
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.onCloseError}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(DailyViewEditor);
