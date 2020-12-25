import React from "react";

const Note = () => {
  return (
    <React.Fragment>
      <div className="col-4">
        <div className="card my-2">
          <div className="card-body">
            <div className="card-title">
              <h4>12/12/20</h4>
            </div>
            <p className="card-text">
              Gave the dog her heartworm medicine and her flea/tick med...
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Note;
