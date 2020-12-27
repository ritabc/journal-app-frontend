import React, { Component } from "react";
import NotesList from "./NotesList";
import NewNoteForm from "./NewNoteForm";

class JournalControl extends Component {
  state = {
    formVisibleOnPage: false,
    stateNotes: [],
  };

  handleAddingNewNoteToJournal = (newNote) => {
    const newStateNotesList = this.state.stateNotes.concat(newNote);
    this.setState({ stateNotes: newStateNotesList, formVisibleOnPage: false });
  };

  handleRequestToCreateNote = () => {
    this.setState({ formVisibleOnPage: true });
  };

  render() {
    let currentlyVisibleState = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewNoteForm
          onNewNoteCreation={this.handleAddingNewNoteToJournal}
          currentJournal={this.props.currentJournal}
        />
      );
    } else {
      currentlyVisibleState = (
        <NotesList
          onClickOfNewNoteBtn={this.handleRequestToCreateNote}
          currentJournal={this.props.currentJournal}
          stateNotes={this.state.stateNotes}
        />
      );
    }
    return <React.Fragment>{currentlyVisibleState}</React.Fragment>;
  }
}

export default JournalControl;
