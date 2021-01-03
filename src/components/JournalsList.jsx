import React from "react";
var fp = require("lodash/fp");

const selectedStyle = {
  color: "#343a40",
  lineHeight: "2.5",
  border: "3px solid transparent",
  borderRadius: "10px 0 0 10px",
  backgroundColor: "#f8f9fa",
  lineHeight: "2.5",
};
const nonSelectedStyle = {
  lineHeight: "2.5",
};
const selectedBtnStyle = { width: "100%", textAlign: "left" };
const nonSelectedBtnStyle = {
  color: "#f8f9fa",
  width: "100%",
  textAlign: "left",
};
const JournalsList = (props) => {
  function handleChangeCurrentJournal(event) {
    console.log(event.target.name);
    props.onChangeCurrentJournal(event.target.name);
  }

  return (
    <React.Fragment>
      <ul>
        {Object.values(props.stateJournals).map((journal) => {
          console.log(journal);
          return (
            <li
              style={
                journal.id === props.currentlySelectedJournal.id
                  ? selectedStyle
                  : nonSelectedStyle
              }
              key={journal.id}
            >
              <button
                onClick={handleChangeCurrentJournal}
                className="btn"
                name={journal.id}
                style={
                  journal.id === props.currentlySelectedJournal.id
                    ? selectedBtnStyle
                    : nonSelectedBtnStyle
                }
              >
                {journal.name}
              </button>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default JournalsList;
