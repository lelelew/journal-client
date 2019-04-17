import React, { Component } from "react";
import { saveEntry } from "./services.js";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Snackbar } from "@material-ui/core";

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
  goals: "",
  wins: "",
  lessonsLearned: ""
};

class EntryForm extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCloseError = this.onCloseError.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    try {
      await saveEntry(this.state);
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
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    const { goals, wins, lessonsLearned, isSubmitting, hasError } = this.state;

    return (
      <div>
        <h3>Daily</h3>
        <TextField
          name="goals"
          id="filled-multiline-flexible"
          label="Goals"
          multiline
          rowsMax="4"
          value={goals}
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
          value={wins}
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
          value={lessonsLearned}
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

export default withStyles(styles)(EntryForm);
