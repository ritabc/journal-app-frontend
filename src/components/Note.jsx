import React from "react";

const Note = (props) => {
  return (
    <React.Fragment>
      <div className="col-4">
        <div className="card my-2">
          <div className="card-body">
            <div className="card-title">
              <h4>{props.note.title}</h4>
              <h5>{props.note.dateCreated}</h5>
            </div>
            <p className="card-text">{props.note.content}</p>
            <p className="card-text">
              <small className="text-muted">
                Last updated {props.note.lastUpdated}
              </small>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Note;
