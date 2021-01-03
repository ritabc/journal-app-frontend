import React, { Component } from "react";
import GoogleBtn from "./GoogleBtn";
import JournalRecorder from "./JournalRecorder";
import { connect } from "react-redux";

class App extends Component {
  state = {
    // loggedIn: false,
    // currentUser: "Rita",
  };

  render() {
    // let currentlyVisible = null;
    // let currentUserExistsInData = false;
    // let currentUsersData = null;
    // for (let i = 0; i < this.props.data.users.length; i++) {
    //   let user = this.props.data.users[i];
    //   if (this.state.currentUser === user.firstName) {
    //     currentUserExistsInData = true;
    //     currentUsersData = user;
    //   }
    // }
    // if (this.state.loggedIn && currentUserExistsInData) {
    //   currentlyVisible = <JournalRecorder currentUser={currentUsersData} />;
    // } else {
    //   currentlyVisible = <GoogleBtn />;
    // }
    // return (
    //   <React.Fragment>
    //     <div className="h-100">{currentlyVisible}</div>
    //   </React.Fragment>
    // );
    return (
      <React.Fragment>
        <JournalRecorder />
      </React.Fragment>
    );
  }
}

export default App;
