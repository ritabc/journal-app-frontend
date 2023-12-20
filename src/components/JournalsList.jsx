import React from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

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

const notSelectedEditDeleteBtnStyles = {
  display: "none",
};

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
          const thisJournalIsCurrentlySelected =
            journal.journalId === props.currentlySelectedJournal.journalId;
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
                <div className="row">
                  <div className="col journal-name px-0">
                    <button
                      onClick={handleChangeCurrentJournal}
                      className="btn"
                      name={journal.journalId}
                      style={
                        thisJournalIsCurrentlySelected
                          ? selectedBtnStyle
                          : nonSelectedBtnStyle
                      }
                    >
                      {journal.name}
                    </button>
                  </div>
                  <div
                    className="btn-group col-lg-5"
                    style={
                      thisJournalIsCurrentlySelected
                        ? undefined
                        : notSelectedEditDeleteBtnStyles
                    }
                  >
                    <EditButton
                      idOfEntityToEdit={journal.journalId}
                      onClickOfEditBtn={props.onClickOfEditJournalBtn}
                    />
                    <div className="px-1"></div>
                    <DeleteButton
                      idOfEntityToEdit={journal.journalId}
                      onClickOfDeleteBtn={handleDeleteJournalBtnClick(
                        journal.journalId
                      )}
                    />
                  </div>
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
