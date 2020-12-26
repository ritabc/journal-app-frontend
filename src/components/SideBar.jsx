import React from "react";
import JournalsList from "./JournalsList";
import SearchAll from "./SearchAll";
import NewJournalBtn from "./NewJournalBtn";

const SideBar = (props) => {
  const sideBarStyles = {
    color: "#f8f9fa",
    fontWeight: "800",
  };

  const newJournalBtnStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <div className="bg-dark h-100" style={sideBarStyles}>
        <h3 className="p-2">My Journals</h3>
        <div className="py-2">
          <SearchAll />
        </div>
        <div className="py-4">
          <JournalsList
            journals={props.journals}
            currentlySelectedJournal={props.currentlySelectedJournal}
          />
        </div>
        <div style={newJournalBtnStyle}>
          <NewJournalBtn />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
