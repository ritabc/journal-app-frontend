import React from "react";
import JournalsList from "./JournalsList";
import SearchAll from "./SearchAll";

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

const SideBar = (props) => {
  function handleNewJournalBtnClick() {
    props.onClickOfNewJournalBtn();
  }
  return (
    <React.Fragment>
      <div className="bg-dark h-100" style={sideBarStyles}>
        <h3 className="p-2">My Journals</h3>
        <div className="py-2">
          <SearchAll />
        </div>
        <div className="py-4">
          <JournalsList
            currentlySelectedJournal={props.currentlySelectedJournal}
            stateJournals={props.stateJournals}
            onChangeCurrentJournal={props.onChangeCurrentJournal}
          />
        </div>
        <div style={newJournalBtnDivStyle}>
          <button
            onClick={handleNewJournalBtnClick}
            className="btn btn-lg px-auto"
            style={newJournalBtnStyle}
          >
            + New Journal
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
