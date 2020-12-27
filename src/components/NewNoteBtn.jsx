import React from "react";
import "../styles/NewNoteBtn.css";

const NewNoteBtn = () => {
  const newJournalBtnStyles = {
    border: "3px solid #5A2762",
    color: "#343a40",
  };

  return (
    <React.Fragment>
      <button style={newJournalBtnStyles} className="btn btn-lg px-auto">
        + New Note
      </button>
    </React.Fragment>
  );
};

export default NewNoteBtn;
