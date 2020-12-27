import React, { Component } from "react";
import NotesList from "./NotesList";
import NewNoteForm from "./NewNoteForm";

class JournalControl extends Component {
  state = {
    formVisibleOnPage: false,
  };
  render() {
    let currentlyVisibleState = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewNoteForm currentJournal={this.props.currentJournal} />
      );
    } else {
      currentlyVisibleState = (
        <NotesList currentJournal={this.props.currentJournal} />
      );
    }
    return <React.Fragment>{currentlyVisibleState}</React.Fragment>;
  }
}

export default JournalControl;
