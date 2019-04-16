import React, { Component } from "react";
import { saveEntry } from "./services.js";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EntryForm extends Component {
  state = {
    isSubmitting: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    await saveEntry(this.state);
    this.setState({ isSubmitting: false });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    const { wins, lessonsLearned, isSubmitting } = this.state;

    return (
      <div>
        <h3>Wins</h3>
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
      </div>
    );
  }
}

export default withStyles(styles)(EntryForm);
