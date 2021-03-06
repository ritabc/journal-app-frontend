import React, { Component } from "react";
import SideBar from "./SideBar";
import JournalControl from "./JournalControl";
import Modal from "react-modal";
import { v4 } from "uuid";
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

const HOST = `${process.env.REACT_APP_API_HOST}`;

const getNotesFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(a.requestNotes());
    fetch(`${HOST}/journals/${getState().selectedJournal.journalId}/notes`, {
      headers: {
        Authorization: getState().currentUser.jwt,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(a.getNotesSuccess(response));
      })
      .catch((error) => {
        dispatch(a.getNotesFailure(error));
      });
  };
};

const postNewJournal = (newJournal) => {
  const name = newJournal.name;
  return (dispatch, getState) => {
    dispatch(a.requestPostNewJournal());
    fetch(`${HOST}/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
      body: JSON.stringify({ journal: { name } }),
    })
      .then((response) => response.json())
      .then((response) => {
        if ("error" in response) {
          if (response.error === e.USER_NOT_AUTHORIZED) {
            dispatch(a.postNewJournalFailure(e.USER_NOT_AUTHORIZED));
            alert(e.USER_NOT_AUTHORIZED);
          }
        } else {
          const { name, id } = response;
          // Store the journal in app state
          dispatch(a.postNewJournalSuccess({ journalId: id, name }));
          //  And update selectedJournal
          dispatch(a.changeJournal({ journalId: id, name }));
          //   And update notes
          dispatch(getNotesFromAPI());
        }
      })
      .catch((error) => {
        dispatch(a.postNewJournalFailure(error));
        alert(`Failed to add note: ${error}`);
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
    const newSelectedJournalId = Object.keys(this.props.journals).find(
      (journalId) => journalId === id
    );
    const changeJournalAction = a.changeJournal(
      this.props.journals[newSelectedJournalId]
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
    // selectedJournal: state.selectedJournal,
    newJournalModalVisible: state.newJournalModalVisible,
    googleSignInToken: state.googleSignInToken,
    // currentUser: state.currentUser,
  };
};

JournalRecorder = connect(mapStateToProps)(JournalRecorder);

export default JournalRecorder;
