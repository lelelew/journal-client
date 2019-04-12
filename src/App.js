import React, { Component } from "react";
import "./App.css";
import { getEntry, getAllEntries } from "./services.js";
import EntryForm from "./EntryForm.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class App extends Component {
  state = {
    allEntries: []
  };

  componentDidMount() {
    (async () => {
      let selectedEntry = await getEntry(1);
      this.setState({ selectedEntry });
      let allEntries = await getAllEntries();
      this.setState({ allEntries });
    })();
  }

  render() {
    const { allEntries } = this.state;
    return (
      <div>
        <List>
          {allEntries &&
            allEntries.map((entry, index) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={entry.wins}
                    secondary={entry.lessons_learned}
                  />
                </ListItem>
              );
            })}
        </List>
        <EntryForm />
      </div>
    );
  }
}

export default App;
