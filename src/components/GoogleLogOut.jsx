import React from "react";
import { GoogleLogout } from "react-google-login";
import * as a from "../actions";
import { connect } from "react-redux";

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

const innerBorderStyles = {
  border: "6px solid #212529",
  borderRadius: "10px",
  backgroundColor: "#f8f9fa",
};

const logOutBtnStyles = {
  color: "#f8f9fa",
  border: "3px solid #5A2762",
  borderRadius: "10px",
};

class GoogleLogOut extends React.Component {
  logout = (response) => {
    const { dispatch } = this.props;
    let signOutTokenAction = a.googleSignOutSuccess();
    let removeCurrentUserAction = a.removeCurrentUser();
    dispatch(signOutTokenAction);
    dispatch(removeCurrentUserAction);
  };

  handleLogoutFailure = (response) => {
    console.log(response);
    alert("Failed to log out");
  };

  render() {
    return (
      <div style={logOutBtnStyles}>
        <div style={innerBorderStyles}>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Sign Out"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          />
        </div>
      </div>
    );
  }
}
GoogleLogOut = connect()(GoogleLogOut);

export default GoogleLogOut;
