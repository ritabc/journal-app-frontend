import React from "react";
import NewNoteBtn from "./NewNoteBtn";
import SearchOne from "./SearchOne";
import Note from "./Note";

const Journal = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const titleNewStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const titleStyle = { color: "#343a40" };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div style={headerStyle} className="row py-3">
          <div style={titleNewStyle}>
            <h2 style={titleStyle} className="pr-2">
              Daily Notes Journal
            </h2>
            <div className="pl-2">
              <NewNoteBtn />
            </div>
          </div>
          <SearchOne />
        </div>
        <div className="row">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Journal;
