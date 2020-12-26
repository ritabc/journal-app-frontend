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

const JournalsList = (props) => {
  return (
    <React.Fragment>
      <ul>
        {props.journals.map((journal) => (
          <li
            style={
              journal.id === props.currentlySelectedJournal.id
                ? selectedStyle
                : nonSelectedStyle
            }
            key={journal.id}
          >
            {journal.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default JournalsList;
