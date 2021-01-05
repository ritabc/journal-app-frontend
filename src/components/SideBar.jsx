import React, { Suspense } from "react";
import JournalsList from "./JournalsList";
import SearchAll from "./SearchAll";
import { connect } from "react-redux";
import * as a from "../actions";
import * as e from "../api/errors";

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

const HOST = `${process.env.REACT_APP_DEV_API_HOST}`;

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
      })
      .catch((error) => {
        dispatch(a.getJournalsFailure(error));
      });
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
          //   dispatch(a.clearSelectedJournal());
          dispatch(a.clearJournals());
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
        alert(`Failed to wipe default journals: ${error}`);
      });
  };
};

class SideBar extends React.Component {
  handleWipeSeedsBtnClick = () => {
    const { dispatch } = this.props;
    dispatch(wipeDefaultJournalsFromApi());
  };

  handleNewJournalBtnClick = () => {
    this.props.onClickOfNewJournalBtn();
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getJournalsFromAPI());
  }

  render() {
    let wipeBtn = null;
    if (checkExistenceOfDefaultJournals(this.props.stateJournals)) {
      console.log("displaying wipe button!");
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
              //   stateJournals={stateJournals}
              stateJournals={this.props.stateJournals}
              onChangeCurrentJournal={this.props.onChangeCurrentJournal}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // journals: state.journals.journals,
    isLoading: state.journals.isLoading,
    error: state.journals.error,
    currentlySelectedJournal: state.selectedJournal,
  };
};

export default connect(mapStateToProps)(SideBar);
