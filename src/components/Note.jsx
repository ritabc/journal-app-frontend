import React from "react";

const Note = (props) => {
  return (
    <React.Fragment>
      <div className="col-4">
        <div className="card my-2">
          <div className="card-body">
            <div className="card-title">
              <h4>{props.dateCreated}</h4>
            </div>
            <p className="card-text">{props.content}</p>
            <p className="card-text">
              <small className="text-muted">
                Last updated {props.lastUpdated}
              </small>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Note;
