import React from "react";
import JournalsList from "./JournalsList";
import SearchAll from "./SearchAll";
import { connect } from "react-redux";
import * as a from "../actions";

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
    console.log(getState().currentUser.jwt);
    dispatch(a.requestJournals());
    return fetch(`${HOST}/journals`, {
      headers: {
        Authorization: getState().currentUser.jwt,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(a.getJournalsSuccess(response));
      })
      .catch((error) => {
        dispatch(a.getJournalsFailure(error));
      });
  };
};

class SideBar extends React.Component {
  handleNewJournalBtnClick() {
    this.props.onClickOfNewJournalBtn();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getJournalsFromAPI());
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-dark h-100" style={sideBarStyles}>
          <h3 className="p-2">My Journals</h3>
          <div className="py-2">
            <SearchAll />
          </div>
          <div className="py-4">
            <JournalsList
              currentlySelectedJournal={this.props.currentlySelectedJournal}
              //   stateJournals={stateJournals}
              stateJournals={this.props.journals}
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
    journals: state.journals.journals,
    isLoading: state.journals.isLoading,
    error: state.journals.error,
  };
};

export default connect(mapStateToProps)(SideBar);
