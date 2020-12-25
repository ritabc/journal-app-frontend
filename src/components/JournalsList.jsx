import React from "react";

const JournalsList = () => {
  const selectedStyle = {
    color: "#343a40",
    lineHeight: "2.5",
    border: "3px solid transparent",
    borderRadius: "10px 0 0 10px",
  };
  const liStyle = {
    lineHeight: "2.5",
  };

  return (
    <React.Fragment>
      <ul>
        <li style={selectedStyle} className="bg-light">
          {/* <a href="#"> */}
          Daily Notes {/* </a> */}
        </li>
        <li style={liStyle}>Introspective Notes</li>
        <li style={liStyle}>Dream Diary</li>
        <li style={liStyle}>Travel / Trips</li>
        <li style={liStyle}>Recipes</li>
      </ul>
    </React.Fragment>
  );
};

export default JournalsList;
