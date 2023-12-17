import React, { Component } from "react";
import SideBar from "./SideBar";
import JournalControl from "./JournalControl";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as a from "../actions";
import * as e from "../api/errors";

Modal.setAppElement("#root");
const createJournalBtnStyles = { border: "3px solid #5A2762" };

const modalStyles = {
  content: {
    width: "50vw",
    height: "50vh",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(50%, 50%)",
  },
};

function objIsEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

const HOST = `${process.env.REACT_APP_API_HOST}`;

const getNotesFromAPI = () => {
  return async (dispatch, getState) => {
    dispatch(a.requestNotes());
    const response = await fetch(
      `${HOST}/journals/${getState().selectedJournal.journalId}/notes`,
      {
        method: "GET",
        headers: {
          Authorization: getState().currentUser.jwt,
        },
      }
    );
    if (!response.ok) {
      if (response.status === e.NOT_FOUND_STATUS_CODE) {
        // due to 404
        dispatch(a.getNotesFailure(e.RECORD_NOT_FOUND));
        alert(e.RECORD_NOT_FOUND);
      } else {
        // failed for misc reason
        dispatch(a.getNotesFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      // response was okay
      const notes = await response.json();
      dispatch(a.getNotesSuccess(notes));
    }
  };
};

const postNewJournal = (newJournal) => {
  const name = newJournal.name;
  return async (dispatch, getState) => {
    dispatch(a.requestPostNewJournal());
    const response = await fetch(`${HOST}/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
      body: JSON.stringify({ journal: { name } }),
    });
    if (!response.ok) {
      if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
        dispatch(a.postNewJournalFailure(e.USER_NOT_AUTHORIZED));
        alert(e.USER_NOT_AUTHORIZED);
      } else {
        dispatch(a.postNewJournalFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      // response is valid
      const body = await response.json();
      const { name, id } = body;
      // Store the journal in app state
      dispatch(a.postNewJournalSuccess({ journalId: id, name }));
      //  Update selectedJournal
      dispatch(a.changeJournal({ journalId: id, name }));
      //  Update notes
      dispatch(getNotesFromAPI());
    }
  };
};

const deleteJournal = (journal) => {
  const { journalId } = journal;
  return (dispatch, getState) => {
    dispatch(a.requestDeleteJournal());
    return fetch(`${HOST}/journals/${journalId}`, {
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
            dispatch(a.deleteJournalFailure(e.PLEASE_LOG_IN));
            alert(e.PLEASE_LOG_IN);
          } else {
            // failed for misc reason
            dispatch(a.deleteJournalFailure(response.statusText));
            alert(`Failed to delete journal: ${response.statusText}`);
          }
        } else {
          // request was successful
          dispatch(a.deleteJournalSuccess(journalId));
          // the deleted journal's notes have been deleted on the backend
          // but we must clear the notes from ui state here too
          dispatch(a.clearNotes());
          // If there are now no more journals, nullify the current journal
          if (objIsEmpty(getState().journals.journals)) {
            dispatch(a.nullifyJournal());
          } else {
            // we still have journals - update current journal to first one
            const dispatchingToChangeJournal =
              getState().journals.journals[
                Object.keys(getState().journals.journals)[0]
              ];
            dispatch(a.changeJournal(dispatchingToChangeJournal));
            dispatch(getNotesFromAPI);
          }
        }
      })
      .catch((error) => {
        dispatch(a.deleteJournalFailure(error));
        alert(`Failed to delete journal: ${error}`);
      });
  };
};

class JournalRecorder extends Component {
  handleRequestToCreateJournal = () => {
    const { dispatch } = this.props;
    const showNewJournalModalAction = a.togggleNewJournalModal();
    dispatch(showNewJournalModalAction);
  };

  handleChangeCurrentJournal = (id) => {
    const { dispatch } = this.props;
    if (this.props.journals instanceof Array) {
      alert(
        "After deleting a journal, and then switching journals, this.props.journals is an ARRAY!"
      );
    }
    const newlySelectedJournalId = Object.keys(this.props.journals).find(
      (journalId) => journalId === id
    );

    const changeJournalAction = a.changeJournal(
      this.props.journals[newlySelectedJournalId]
    );

    dispatch(changeJournalAction);
    dispatch(getNotesFromAPI());
  };

  handleCreateJournal = (event) => {
    // event.preventDefault();
    const { dispatch } = this.props;
    const newJournal = {
      name: event.target.name.value,
    };
    const hideNewJournalModalAction = a.togggleNewJournalModal();

    dispatch(postNewJournal(newJournal));
    dispatch(hideNewJournalModalAction);
  };

  handleRequestToDeleteJournal = (journal) => {
    const { dispatch } = this.props;
    dispatch(deleteJournal(journal));
  };

  render() {
    let modal = null;
    if (this.props.newJournalModalVisible) {
      modal = (
        <Modal isOpen={this.props.newJournalModalVisible} style={modalStyles}>
          <h2>Create a Journal</h2>
          <form onSubmit={this.handleCreateJournal}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="newJournalName"
                placeholder="Enter Journal Name"
                name="name"
              />
              <label htmlFor="newJournalName">Enter Journal Name</label>
            </div>
            <button
              type="submit"
              className="btn mt-3"
              style={createJournalBtnStyles}
            >
              Create Journal
            </button>
          </form>
        </Modal>
      );
    }
    return (
      <React.Fragment>
        <div className="row h-100">
          <div className="col-2 pe-0">
            <SideBar
              //   currentlySelectedJournal={this.props.selectedJournal}
              stateJournals={this.props.journals}
              onClickOfNewJournalBtn={this.handleRequestToCreateJournal}
              onChangeCurrentJournal={this.handleChangeCurrentJournal}
              onClickOfDeleteJournalBtn={this.handleRequestToDeleteJournal}
            />
          </div>
          <div className="col-10 bg-light">
            <JournalControl
            // currentJournal={this.props.selectedJournal}
            />
          </div>
        </div>
        {modal}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    journals: state.journals.journals,
    journalsIsLoading: state.journals.isLoading,
    getJournalsError: state.journals.error,
    selectedJournal: state.selectedJournal,
    newJournalModalVisible: state.newJournalModalVisible,
    googleSignInToken: state.googleSignInToken,
    // currentUser: state.currentUser,
  };
};

JournalRecorder = connect(mapStateToProps)(JournalRecorder);

export default JournalRecorder;
