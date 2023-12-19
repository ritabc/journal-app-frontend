import React from "react";
import EditButton from "./EditButton";
import * as a from "../actions";

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

const ulStyles = { listStyleType: "none" };

const selectedJournalCrudBtnStyle = {
  backgroundColor: "#f8f9fa",
  width: "auto",
};

const nonSelectedJournalCrudBtnStyle = { opacity: "0" };

const JournalsList = (props) => {
  function handleDeleteJournalBtnClick(journalId) {
    return () => {
      return props.onClickOfDeleteJournalBtn({
        journalId,
      });
    };
  }

  function handleChangeCurrentJournal(event) {
    props.onChangeCurrentJournal(event.target.name);
  }

  let list = null;
  if (props.journals.length !== 0 && props.currentlySelectedJournal !== null) {
    list = (
      <ul style={ulStyles}>
        {Object.values(props.journals).map((journal) => {
          return (
            <li
              style={
                journal.journalId === props.currentlySelectedJournal.journalId
                  ? selectedStyle
                  : nonSelectedStyle
              }
              key={journal.journalId}
            >
              <div className="container">
                <div className="row mx-0">
                  <button
                    onClick={handleChangeCurrentJournal}
                    className="btn col"
                    name={journal.journalId}
                    style={
                      journal.journalId ===
                      props.currentlySelectedJournal.journalId
                        ? selectedBtnStyle
                        : nonSelectedBtnStyle
                    }
                  >
                    {journal.name}
                  </button>
                  <EditButton
                    idOfEntityToEdit={journal.journalId}
                    onClickOfEditBtn={props.onClickOfEditJournalBtn}
                    style={
                      journal.journalId ===
                      props.currentlySelectedJournal.journalId
                        ? selectedJournalCrudBtnStyle
                        : nonSelectedJournalCrudBtnStyle
                    }
                  />
                  <button
                    onClick={handleDeleteJournalBtnClick(journal.journalId)}
                    className="col-1 px-2"
                    style={
                      journal.journalId ===
                      props.currentlySelectedJournal.journalId
                        ? selectedJournalCrudBtnStyle
                        : nonSelectedJournalCrudBtnStyle
                    }
                  >
                    D
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  return <React.Fragment>{list}</React.Fragment>;
};

export default JournalsList;
