import React from "react";
import SideBar from "./SideBar";
import JournalControl from "./JournalControl";

const JournalRecorder = () => {
  return (
    <React.Fragment>
      <div className="row h-100">
        <div className="col-2 pe-0">
          <SideBar />
        </div>
        <div className="col-10 bg-light">
          <JournalControl />
        </div>
      </div>
      {/* {modal} */}
    </React.Fragment>
  );
};

export default JournalRecorder;
