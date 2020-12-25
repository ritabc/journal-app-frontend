import React from "react";
import "../styles/NewNoteBtn.css";

const NewNoteBtn = () => {
  const newJournalBtnStyles = {
    // backgroundColor: "#a500a5",
    // backgroundColor: "#81388c",
    border: "3px solid #5A2762",
    color: "#343a40",
  };

  return (
    <React.Fragment>
      <button
        style={newJournalBtnStyles}
        className="btn btn-lg px-auto"
        // id="new-note-btn"
      >
        + New Note
      </button>
    </React.Fragment>
  );
};

export default NewNoteBtn;
