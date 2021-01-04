import React from "react";

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
  console.log(props.stateJournals);
  console.log(props.currentlySelectedJournal);

  function handleChangeCurrentJournal(event) {
    console.log(event.target.name);
    props.onChangeCurrentJournal(event.target.name);
  }

  let list = null;
  if (
    props.stateJournals.length !== 0 &&
    props.currentlySelectedJournal !== null
  ) {
    list = (
      <ul>
        {Object.values(props.stateJournals).map((journal) => {
          console.log(journal);
          return (
            <li
              style={
                journal.journalId === props.currentlySelectedJournal.journalId
                  ? selectedStyle
                  : nonSelectedStyle
              }
              key={journal.journalId}
            >
              <button
                onClick={handleChangeCurrentJournal}
                className="btn"
                name={journal.journalId}
                style={
                  journal.journalId === props.currentlySelectedJournal.journalId
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
    );
  }
  return <React.Fragment>{list}</React.Fragment>;
};

export default JournalsList;
