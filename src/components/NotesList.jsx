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

const NotesList = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div style={headerStyle} className="py-3">
          <div style={titleNewStyle}>
            <h2 style={titleStyle}>{props.currentJournal.name}</h2>
            <div className="px-3">
              <NewNoteBtn />
            </div>
          </div>
          <div className="pt-2">
            <SearchOne />
          </div>
        </div>
        <div className="row">
          {props.currentJournal.notes.map((note) => (
            <Note note={note} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotesList;
