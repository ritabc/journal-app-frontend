import React, { Suspense } from "react";
import JournalsList from "./JournalsList";
import SearchAll from "./SearchAll";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as a from "../actions";
import * as e from "../api/errors";

Modal.setAppElement("#root");

const sideBarStyles = {
  color: "#f8f9fa",
  fontWeight: "800",
};
const newJournalBtnDivStyle = {
  display: "flex",
  justifyContent: "center",
};
const newJournalBtnStyle = {
  border: "3px solid #5A2762",
  color: "#f8f9fa",
};

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

const getJournalsFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(a.requestJournals());
    return fetch(`${HOST}/journals`, {
      headers: {
        Authorization: getState().currentUser.jwt,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(a.getJournalsSuccess(response));
        // If we receive more than 0 journals from the API, change the currentJournal and request its notes
        if (response.length !== 0) {
          dispatch(
            a.changeJournal(
              getState().journals.journals[
                Object.keys(getState().journals.journals)[0]
              ]
            )
          );
          dispatch(a.requestNotes());
          fetch(
            `${HOST}/journals/${getState().selectedJournal.journalId}/notes`,
            {
              headers: {
                Authorization: getState().currentUser.jwt,
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              dispatch(a.getNotesSuccess(response));
            })
            .catch((error) => {
              dispatch(a.getNotesFailure(error));
            });
        }
      })
      .catch((error) => {
        dispatch(a.getJournalsFailure(error));
      });
  };
};

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

const checkExistenceOfDefaultJournals = (journals) => {
  const currentJournalNames = Object.values(journals).map((journalEl) => {
    return journalEl.name;
  });
  return [
    "Recipes",
    "Daily Notes",
    "Dream Diary",
    "Travel Notes",
    "Introspective Notes",
  ].every((element) => {
    return currentJournalNames.includes(element);
  });
};

const wipeDefaultJournalsFromApi = () => {
  return (dispatch, getState) => {
    fetch(`${HOST}/wipe_seeded`, {
      method: "DELETE",
      headers: {
        Authorization: getState().currentUser.jwt,
      },
    })
      .then((response) => response.json)
      .then((response) => {
        if ("message" in response) {
          if (response.message === e.PLEASE_LOG_IN) {
            alert(e.PLEASE_LOG_IN);
          }
        } else {
          // Clear default journals
          dispatch(a.clearJournals());
          // if we don't have any journals, change current journal to null
          if (Object.keys(getState().journals.journals).length === 0) {
            dispatch(a.nullifyJournal());
          } else {
            dispatch(
              a.changeJournal(
                getState().journals.journals[
                  Object.keys(getState().journals.journals)[0]
                ]
              )
            );
            dispatch(a.requestNotes());
            fetch(
              `${HOST}/journals/${getState().selectedJournal.journalId}/notes`,
              {
                headers: {
                  Authorization: getState().currentUser.jwt,
                },
              }
            )
              .then((response) => response.json())
              .then((response) => {
                dispatch(a.getNotesSuccess(response));
              })
              .catch((error) => {
                dispatch(a.getNotesFailure(error));
              });
          }
        }
      })
      .catch((error) => {
        alert(`Failed to wipe default journals: ${error}`);
      });
  };
};

const putUpdatedJournal = (updatedJournal) => {
  const { name, journalId } = updatedJournal;
  return async (dispatch, getState) => {
    dispatch(a.requestToPostPutNewJournal());
    const response = await fetch(`${HOST}/journals/${journalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().currentUser.jwt,
      },
      body: JSON.stringify({ journal: { name } }),
    });
    if (!response.ok) {
      if (response.status === e.UNAUTHORIZED_STATUS_CODE) {
        dispatch(a.postPutJournalFailure(e.USER_NOT_AUTHORIZED));
        alert(e.USER_NOT_AUTHORIZED);
      } else {
        dispatch(a.postPutJournalFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      const body = await response.json();
      const { name, id } = body;
      dispatch(a.postPutJournalSuccess({ journalId: id, name }));
      dispatch(a.changeJournal({ journalId: id, name }));
    }
  };
};

const postNewJournal = (newJournal) => {
  const name = newJournal.name;
  return async (dispatch, getState) => {
    dispatch(a.requestToPostPutNewJournal());
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
        dispatch(a.postPutJournalFailure(e.USER_NOT_AUTHORIZED));
        alert(e.USER_NOT_AUTHORIZED);
      } else {
        dispatch(a.postPutJournalFailure(response.statusText));
        alert(response.statusText);
      }
    } else {
      // response is valid
      const body = await response.json();
      const { name, id } = body;
      // Store the journal in app state
      dispatch(a.postPutJournalSuccess({ journalId: id, name }));
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
            const firstJournal =
              getState().journals.journals[
                Object.keys(getState().journals.journals)[0]
              ];
            dispatch(a.changeJournal(firstJournal));
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

class SideBar extends React.Component {
  handleWipeSeedsBtnClick = () => {
    const { dispatch } = this.props;
    dispatch(wipeDefaultJournalsFromApi());
  };

  handleChangeCurrentJournal = (id) => {
    const { dispatch } = this.props;
    const newlySelectedJournalId = Object.keys(this.props.journals).find(
      (journalId) => journalId === id
    );

    const changeJournalAction = a.changeJournal(
      this.props.journals[newlySelectedJournalId]
    );

    dispatch(changeJournalAction);
    dispatch(getNotesFromAPI());
  };

  handleNewJournalBtnClick = () => {
    const { dispatch } = this.props;
    dispatch(a.showNewJournalModal());
  };

  handleEditJournalBtnClick = (entityToEdit) => {
    const { dispatch } = this.props;
    const journals = this.props.journals;
    const journalToEdit = Object.values(journals).find(
      (j) => j.journalId === entityToEdit.entityId
    );
    dispatch(a.showEditJournalModal(journalToEdit));
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getJournalsFromAPI());
  }

  handleRequestToDeleteJournal = (journal) => {
    const { dispatch } = this.props;
    dispatch(deleteJournal(journal));
  };

  handleNewJournalFormSubmit = (event) => {
    const { dispatch } = this.props;
    const newJournal = {
      name: event.target.name.value,
    };

    dispatch(postNewJournal(newJournal));
    dispatch(a.hideNewEditJournalModal());
  };

  handleEditJournalFormSubmit = (event) => {
    const { dispatch } = this.props;
    const updatedJournal = {
      journalId: event.target.journalId.value,
      name: event.target.name.value,
    };
    dispatch(putUpdatedJournal(updatedJournal));
    dispatch(a.hideNewEditJournalModal());
  };

  render() {
    let wipeBtn = null;
    if (checkExistenceOfDefaultJournals(this.props.journals)) {
      wipeBtn = (
        <div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete the default Journals (Recipes, Daily Notes, Dream Diary, Travel Notes, and Introspective Notes) AND their notes?"
                )
              )
                this.handleWipeSeedsBtnClick();
            }}
            className="btn btn-lg btn-danger"
          >
            Delete Default Journals
          </button>
        </div>
      );
    }

    let modal = null;
    const isNew =
      this.props.newOrEditJournalModal.whichForm == "new" ? true : false;
    if (this.props.newOrEditJournalModal.visible) {
      modal = (
        <Modal
          isOpen={this.props.newOrEditJournalModal.visible}
          style={modalStyles}
        >
          <h2>{isNew ? "Create" : "Edit"} a Journal</h2>
          <form
            onSubmit={
              isNew
                ? this.handleNewJournalFormSubmit
                : this.handleEditJournalFormSubmit
            }
          >
            <input
              type="hidden"
              name="journalId"
              value={this.props.newOrEditJournalModal.journal.journalId}
            />
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="newJournalName"
                placeholder="Enter Journal Name"
                name="name"
                defaultValue={
                  isNew ? "" : this.props.newOrEditJournalModal.journal.name
                }
              />
              <label htmlFor="newJournalName">Enter Journal Name</label>
            </div>
            <button
              type="submit"
              className="btn mt-3"
              style={createJournalBtnStyles}
            >
              {isNew ? "Create" : "Update"} Journal
            </button>
          </form>
        </Modal>
      );
    }
    return (
      <React.Fragment>
        <div className="bg-dark h-100" style={sideBarStyles}>
          <h3 className="p-2">My Journals</h3>
          {/* <div className="py-2">
            <SearchAll />
          </div> */}
          {wipeBtn}
          <div className="py-4">
            <JournalsList
              currentlySelectedJournal={this.props.currentlySelectedJournal}
              journals={this.props.journals}
              onChangeCurrentJournal={this.handleChangeCurrentJournal}
              onClickOfDeleteJournalBtn={this.handleRequestToDeleteJournal}
              onClickOfEditJournalBtn={this.handleEditJournalBtnClick}
            />
          </div>
          <div style={newJournalBtnDivStyle}>
            <button
              onClick={this.handleNewJournalBtnClick}
              className="btn btn-lg px-auto"
              style={newJournalBtnStyle}
            >
              + New Journal
            </button>
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
    isLoading: state.journals.isLoading,
    error: state.journals.error,
    currentlySelectedJournal: state.selectedJournal,
    newOrEditJournalModal: state.newOrEditJournalForm,
  };
};

export default connect(mapStateToProps)(SideBar);
