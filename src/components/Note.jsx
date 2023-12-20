import React from "react";
import moment from "moment";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const noteCardTitleStyles = {};

const titleElementsStyles = {};

const Note = (props) => {
  function handleDeleteNoteBtnClick() {
    props.onClickOfDeleteNoteBtn({
      journalId: props.note.journalId,
      noteId: props.note.noteId,
    });
  }

  return (
    <React.Fragment>
      <div className="col-4">
        <div className="card my-2">
          <div className="card-body container">
            <div className="card-title row" style={noteCardTitleStyles}>
              <div className="col" style={titleElementsStyles}>
                <h4>{props.note.title}</h4>
                <h5>{moment(props.note.dateCreated).format("MMM Do YYYY")}</h5>
              </div>
              <div class="btn-group col-lg-4">
                <EditButton
                  idOfEntityToEdit={props.note.noteId}
                  onClickOfEditBtn={props.onClickOfEditNoteBtn}
                />
                <div className="px-1"></div>

                <DeleteButton
                  idOfEntityToEdit={props.note.noteId}
                  onClickOfDeleteBtn={handleDeleteNoteBtnClick}
                />
              </div>
            </div>
            <p className="card-text">{props.note.content}</p>
            <p className="card-text">
              <small className="text-muted">
                Last updated {moment(props.note.lastUpdated).fromNow()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Note;
