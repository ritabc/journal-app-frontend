import React, { Component } from "react";
import NotesList from "./NotesList";
import NewNoteForm from "./NewNoteForm";
import { connect } from "react-redux";
import * as a from "./../actions";
import { POST_NEW_NOTE_SUCCESS } from "../actions/ActionTypes";
import * as e from "../api/errors";

const HOST = `${process.env.REACT_APP_DEV_API_HOST}`;

const postNewNote = (newNote) => {
  const { title, content, journalId } = newNote;
  return (dispatch, getState) => {
    dispatch(a.requestPostNewNote());
    return fetch(`${HOST}/journals/${journalId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
      body: JSON.stringify({ note: { title, content, journalId } }),
    })
      .then((response) => response.json())
      .then((response) => {
        if ("error" in response) {
          if (response.error === e.USER_NOT_AUTHORIZED) {
            dispatch(a.postNewNoteFailure(e.USER_NOT_AUTHORIZED));
            alert(e.USER_NOT_AUTHORIZED);
          }
        } else {
          const {
            journal_id,
            title,
            content,
            created_at,
            updated_at,
            id,
          } = response;
          dispatch(
            a.postNewNoteSuccess({
              noteId: id,
              journalId: journal_id,
              dateCreated: created_at,
              lastUpdated: updated_at,
              title,
              content,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(a.postNewNoteFailure(error));
        alert(`Failed to add note: ${error}`);
      });
  };
};

class JournalControl extends Component {
  handleAddingNewNoteToJournal = (newNote) => {
    const { dispatch } = this.props;
    const toggleFormVisibilityAction = a.toggleNewNoteForm();
    dispatch(postNewNote(newNote));
    dispatch(toggleFormVisibilityAction);
  };

  handleRequestToCreateNote = () => {
    const { dispatch } = this.props;
    const toggleFormVisibilityAction = a.toggleNewNoteForm();
    dispatch(toggleFormVisibilityAction);
  };

  render() {
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
