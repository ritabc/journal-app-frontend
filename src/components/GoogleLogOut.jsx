import React from "react";
import { GoogleLogout } from "react-google-login";
import * as a from "../actions";
import { connect } from "react-redux";

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

class GoogleLogOut extends React.Component {
  logout = (response) => {
    const { dispatch } = this.props;
    let action = a.googleSignOutSuccess();
    dispatch(action);
  };

  handleLogoutFailure = (response) => {
    console.log(response);
    alert("Failed to log out");
  };

  render() {
    return (
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={this.logout}
        onFailure={this.handleLogoutFailure}
      />
    );
  }
}
GoogleLogOut = connect()(GoogleLogOut);

export default GoogleLogOut;
