import React from "react";
import NewNoteBtn from "./NewNoteBtn";
import SearchOne from "./SearchOne";
import Note from "./Note";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const titleNewStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const titleStyle = { color: "#343a40" };

const newNoteBtnStyles = {
  border: "3px solid #5A2762",
  color: "#343a40",
};

const NotesList = (props) => {
  function handleNewNoteBtnClick() {
    props.onClickOfNewNoteBtn();
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div style={headerStyle} className="py-3">
          <div style={titleNewStyle}>
            <h2 style={titleStyle}>{props.currentJournal.name}</h2>
            <div className="px-3">
              <button
                onClick={handleNewNoteBtnClick}
                style={newNoteBtnStyles}
                className="btn btn-lg px-auto"
              >
                + New Note
              </button>{" "}
            </div>
          </div>
          <div className="pt-2">
            <SearchOne />
          </div>
        </div>
        <div className="row">
          {/* TODO: eventually, remove one method of storing the data. For now, work with notes from staticData.js for show, and with stateNotes for practie with passing events up and altering state that way */}
          {props.currentJournal.notes
            .filter((note) => note.journalID == props.currentJournal.id)
            .map((note) => (
              <Note note={note} key={note.id} />
            ))}
          {props.stateNotes
            .filter((note) => note.journalID == props.currentJournal.id)
            .map((note) => (
              <Note note={note} key={note.id} />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotesList;
