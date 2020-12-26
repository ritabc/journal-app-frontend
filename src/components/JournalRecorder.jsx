import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Journal from "./Journal";

class JournalRecorder extends Component {
  state = {
    currentlySelectedJournal: this.props.currentUser.journals[0],
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid px-0 h-100">
          <Header userFirstName={this.props.currentUser.firstName} />
          <div className="row h-100">
            <div className="col-2 pr-0">
              <SideBar
                journals={this.props.currentUser.journals}
                currentlySelectedJournal={this.state.currentlySelectedJournal}
              />
            </div>
            <div className="col-10 bg-light">
              <Journal currentJournal={this.state.currentlySelectedJournal} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JournalRecorder;
