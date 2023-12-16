import React, { Component } from "react";
import NotesList from "./NotesList";
import NewNoteForm from "./NewNoteForm";
import { connect } from "react-redux";
import * as a from "./../actions";
import * as e from "../api/errors";

const HOST = `${process.env.REACT_APP_API_HOST}`;

const deleteNote = (note) => {
  const { journalId, noteId } = note;
  return (dispatch, getState) => {
    dispatch(a.requestDeleteNote());
    return fetch(`${HOST}/journals/${journalId}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // request failed
          if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
            // due to 401
            dispatch(a.deleteNoteFailure(e.PLEASE_LOG_IN));
            alert(e.PLEASE_LOG_IN);
          } else {
            // failed due to unknown reason
            dispatch(a.deleteNoteFailure(response.statusText));
          }
        } else {
          // request was successful
          dispatch(a.deleteNoteSuccess(noteId));
        }
      })
      .catch((error) => {
        dispatch(a.deleteNoteFailure(error));
        alert(`Failed to add note: ${error}`);
      });
  };
};

const postNewNote = (newNote) => {
  const { title, content, journalId } = newNote;
  return async (dispatch, getState) => {
    dispatch(a.requestPostNewNote());
    const response = await fetch(`${HOST}/journals/${journalId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
        // Authorization: "AbC",
      },
      body: JSON.stringify({ note: { title, content, journalId } }),
    });
    if (!response.ok) {
      // request failed
      if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
        // due to 401
        dispatch(a.postNewNoteFailure(response.statusText));
        alert(response.statusText);
      } else {
        // failed due to unknown reason
        dispatch(a.deleteNoteFailure(response.statusText));
      }
    } else {
      // response was okay
      const body = await response.json();
      const { journal_id, title, content, created_at, updated_at, id } = body;
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
    return response;
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

  handleRequestToDeleteNote = (note) => {
    const { dispatch } = this.props;
    dispatch(deleteNote(note));
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
          onClickOfDeleteNoteBtn={this.handleRequestToDeleteNote}
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
