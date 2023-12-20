import React, { Component } from "react";
import NotesList from "./NotesList";
import NoteForm from "./NoteForm";
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
            alert(`Failed to delete note: ${response.statusText}`);
          }
        } else {
          // request was successful
          dispatch(a.deleteNoteSuccess(noteId));
        }
      })
      .catch((error) => {
        dispatch(a.deleteNoteFailure(error));
        alert(`Failed to delete note: ${error}`);
      });
  };
};

const postNewNote = (newNote) => {
  const { title, content, journalId } = newNote;
  return async (dispatch, getState) => {
    dispatch(a.requestToPostPutNote());
    const response = await fetch(`${HOST}/journals/${journalId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
      body: JSON.stringify({ note: { title, content, journalId } }),
    });
    if (!response.ok) {
      // request failed
      if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
        // due to 401
        dispatch(a.postPutNoteFailure(e.USER_NOT_AUTHORIZED));
        alert(e.USER_NOT_AUTHORIZED);
      } else {
        // failed due to unknown reason
        dispatch(a.postPutNoteFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      // response was okay
      const body = await response.json();
      const { journal_id, title, content, created_at, updated_at, id } = body;
      dispatch(
        a.postNoteSuccess({
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

const putNoteEdit = (updatedNote) => {
  const { noteId, title, content, journalId } = updatedNote;
  return async (dispatch, getState) => {
    dispatch(a.requestToPostPutNote()); // assign state.isLoading = true
    const response = await fetch(
      `${HOST}/journals/${journalId}/notes/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getState().currentUser.jwt,
        },
        body: JSON.stringify({ note: { title, content, journalId } }),
      }
    );
    if (!response.ok) {
      if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
        // 401
        dispatch(a.postPutNoteFailure(e.USER_NOT_AUTHORIZED));
        alert(e.USER_NOT_AUTHORIZED);
      } else {
        dispatch(a.postPutNoteFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      // put was successful
      const body = await response.json();
      const { journal_id, title, content, created_at, updated_at, id } = body;
      dispatch(
        a.putNoteSuccess({
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
  handleNewNoteAddSubmitBtnClick = (newNote) => {
    const { dispatch } = this.props;
    dispatch(postNewNote(newNote));
    dispatch(a.closeNewEditNoteForm());
  };

  handleNoteEditSubmitBtnClick = (updatedNote) => {
    const { dispatch } = this.props;
    dispatch(putNoteEdit(updatedNote));
    dispatch(a.closeNewEditNoteForm());
  };

  handleRequestToCreateNote = () => {
    const { dispatch } = this.props;
    dispatch(a.openFormToCreateNewNote());
  };

  handleRequestToDeleteNote = (note) => {
    const { dispatch } = this.props;
    dispatch(deleteNote(note));
  };

  handleEditNoteBtnClick = (entityToEdit) => {
    const { dispatch } = this.props;
    const notes = this.props.notes.notes;
    const noteToEdit = Object.values(notes).find(
      (n) => n.noteId === entityToEdit.entityId
    );
    dispatch(a.openEditNoteForm(noteToEdit));
  };

  render() {
    let currentlyVisibleState = null;
    if (this.props.newOrEditNoteForm.visible) {
      currentlyVisibleState = (
        <NoteForm
          onNewNoteCreation={this.handleNewNoteAddSubmitBtnClick}
          onNoteEditSubmit={this.handleNoteEditSubmitBtnClick}
          currentJournal={this.props.currentJournal}
          whichForm={this.props.newOrEditNoteForm.whichForm}
          noteToEdit={this.props.newOrEditNoteForm.note}
        />
      );
    } else {
      currentlyVisibleState = (
        <NotesList
          onClickOfNewNoteBtn={this.handleRequestToCreateNote}
          currentJournal={this.props.currentJournal}
          stateNotes={this.props.notes}
          onClickOfDeleteNoteBtn={this.handleRequestToDeleteNote}
          onClickOfEditNoteBtn={this.handleEditNoteBtnClick}
        />
      );
    }
    return <React.Fragment>{currentlyVisibleState}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    currentJournal: state.selectedJournal,
    newOrEditNoteForm: state.newOrEditNoteForm,
  };
};

JournalControl = connect(mapStateToProps)(JournalControl);

export default JournalControl;
