import React from "react";

const titleStyles = { color: "#343a40" };
const inputStyles = {
  color: "#343a40",
};
const textAreaStyles = {
  height: "300px",
};
const saveNoteBtnStyles = {
  backgroundColor: "#003100",
  color: "#f8f9fa",
};

const NoteForm = (props) => {
  function handleFormSubmit(event) {
    event.preventDefault();
    if (props.whichForm === "new") {
      props.onNewNoteCreation({
        title: event.target.title.value,
        content: event.target.content.value,
        journalId: event.target.journalId.value,
      });
    } else if (props.whichForm === "edit") {
      props.onNoteEditSubmit({
        noteId: props.noteToEdit.noteId,
        title: event.target.title.value,
        content: event.target.content.value,
        journalId: event.target.journalId.value,
      });
    }
  }

  const newForm = props.whichForm === "new";

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h2 className="py-3" style={titleStyles}>
          {newForm ? "New" : "Edit"} Note in Journal:{" "}
          {props.currentJournal.name}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="hidden"
            name="journalId"
            value={props.currentJournal.journalId}
          />
          <div className="form-floating pb-3">
            <input
              type="text"
              className="form-control"
              id="titleInput"
              placeholder="Note Title"
              defaultValue={
                props.whichForm === "new" ? "" : props.noteToEdit.title
              }
              name="title"
            />
            <label htmlFor="titleInput" style={inputStyles}>
              Note Title
            </label>
          </div>
          <div className="form-floating">
            <textarea
              name="content"
              id="contentInput"
              className="form-control"
              placeholder="Enter note content"
              defaultValue={
                props.whichForm === "new" ? "" : props.noteToEdit.content
              }
              style={textAreaStyles}
            ></textarea>
            <label htmlFor="contentInput" style={inputStyles}>
              Enter note content
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-lg mt-3"
            style={saveNoteBtnStyles}
          >
            Save Note
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NoteForm;
