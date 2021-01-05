import React from "react";
import { mockComponent } from "react-dom/test-utils";
import moment from "moment";

const Note = (props) => {
  return (
    <React.Fragment>
      <div className="col-4">
        <div className="card my-2">
          <div className="card-body">
            <div className="card-title">
              <h4>{props.note.title}</h4>
              <h5>{moment(props.note.dateCreated).format("MMM Do YYYY")}</h5>
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
