import React, { Component } from "react";
import NotesList from "./NotesList";
import NewNoteForm from "./NewNoteForm";
import { connect } from "react-redux";
import * as a from "./../actions";

// const HOST = `${process.env.REACT_APP_DEV_API_HOST}`;

// const getNotesFromApi = () => {
//   return (dispatch, getState) => {
//     console.log(getState());
//     dispatch(a.requestNotes());
//     return fetch(
//       `${HOST}/journals/${getState().selectedJournal.journalId}notes`,
//       {
//         headers: {
//           Authorization: getState().currentUser.jwt,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         dispatch(a.getNotesSuccess(response));
//       })
//       .catch((error) => {
//         dispatch(a.getNotesFailure(error));
//       });
//   };
// };

class JournalControl extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(getNotesFromApi());
  }

  handleAddingNewNoteToJournal = (newNote) => {
    const { dispatch } = this.props;
    const toggleFormVisibilityAction = a.toggleNewNoteForm();
    const newNoteAction = a.addNote(newNote);
    dispatch(newNoteAction);
    dispatch(toggleFormVisibilityAction);
  };

  handleRequestToCreateNote = () => {
    const { dispatch } = this.props;
    const toggleFormVisibilityAction = a.toggleNewNoteForm();
    dispatch(toggleFormVisibilityAction);
  };

  render() {
      console.log(this.props.notes)
    let currentlyVisibleState = null;
    if (this.props.newNoteFormVisibleOnPage) {
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
          //   stateNotes={Object.fromEntries(
          //     Object.entries(this.props.notes).filter(
          //       ([key, value]) => value.journalId == this.props.currentJournal.id
          //     )
          //   )}
          stateNotes={this.props.notes}
        />
      );
    }
    return <React.Fragment>{currentlyVisibleState}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    newNoteFormVisibleOnPage: state.newNoteFormVisibleOnPage,
    notes: state.notes,
    currentJournal: state.selectedJournal,
  };
};

JournalControl = connect(mapStateToProps)(JournalControl);

export default JournalControl;
