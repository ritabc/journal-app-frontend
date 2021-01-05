import React from "react";
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
  let currentlyVisible;

  if (props.currentJournal == null) {
    currentlyVisible = (
      <div className="container-fluid">
        <div style={headerStyle} className="py-3">
          <div style={titleNewStyle}>
            <h2 style={titleStyle}>No Journals Yet. Add one!</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.stateNotes.error !== null) {
    currentlyVisible = <div>Error: {props.stateNotes.error}</div>;
  } else if (props.stateNotes.isLoading) {
    currentlyVisible = <div>Loading...</div>;
  } else {
    currentlyVisible = (
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
          {/* <div className="pt-2">
            <SearchOne />
          </div> */}
        </div>
        <div className="row">
          {/* Send sorted notes, one at a time, to Note component */}
          {Object.keys(props.stateNotes.notes)
            .sort((a, b) => {
              return (
                new Date(props.stateNotes.notes[b]["dateCreated"]) -
                new Date(props.stateNotes.notes[a]["dateCreated"])
              );
            })
            .map((noteId) => (
              <Note note={props.stateNotes.notes[noteId]} key={noteId} />
            ))}
        </div>
      </div>
    );
  }

  return <React.Fragment>{currentlyVisible}</React.Fragment>;
};

export default NotesList;
