import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Journal from "./Journal";

const JournalRecorder = () => {
  return (
    <React.Fragment>
      <div className="container-fluid px-0">
        <Header />
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-2 sidebar">
              <SideBar />
            </div>
            <div className="col-10">
              <Journal />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JournalRecorder;
