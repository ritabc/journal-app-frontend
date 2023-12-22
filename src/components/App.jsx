import React, { Component } from "react";
import JournalRecorder from "./JournalRecorder";
import { connect } from "react-redux";
import LoginWithGoogle from "./LoginWithGoogle";
import Header from "./Header";

const logInStylesContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#212529",
};

const logInStyles = {
  border: "10px solid #5A2762",
  borderRadius: "15px",
  backgroundColor: "#212529",
};

const innerBorderStyles = {
  border: "15px solid #212529",
  borderRadius: "15px",
  backgroundColor: "#f8f9fa",
};

const googleSignInStyles = {
  display: "flex",
  justifyContent: "space-around",
};

class App extends Component {
  render() {
    let display = null;
    if (!this.props.authenticationIsNotLoading) {
      display = (
        <div style={logInStylesContainer} className="h-100">
          <div style={logInStyles}>
            <div style={innerBorderStyles} className="p-5">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      );
    } else if ("jwt" in this.props.currentUser) {
      display = <JournalRecorder />;
    } else {
      display = (
        <div style={logInStylesContainer} className="h-100">
          <div style={logInStyles}>
            <div style={innerBorderStyles} className="p-5">
              <h2>Log In/Sign Up With Google</h2>
              <div style={googleSignInStyles} className="pt-2">
                <LoginWithGoogle />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container-fluid px-0 h-100">
          <Header currentUser={this.props.currentUser} />
          {display}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    authenticationIsNotLoading: state.authenticationStatusChangeIsComplete,
  };
};

export default connect(mapStateToProps)(App);
