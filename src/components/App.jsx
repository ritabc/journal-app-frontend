import React, { Component } from "react";
import GoogleBtn from "./GoogleBtn";
import JournalRecorder from "./JournalRecorder";

class App extends Component {
  state = {
    loggedIn: true,
  };

  render() {
    let currentlyVisible = null;
    if (this.state.loggedIn) {
      currentlyVisible = <JournalRecorder />;
    } else {
      currentlyVisible = <GoogleBtn />;
    }
    return (
      <React.Fragment>
        <div>{currentlyVisible}</div>
      </React.Fragment>
    );
  }
}

export default App;
