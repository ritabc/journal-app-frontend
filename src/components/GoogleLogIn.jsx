import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import * as a from "../actions";

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

class GoogleLogIn extends React.Component {
  login = (response) => {
    const { dispatch } = this.props;
    if (response.accessToken) {
      let action = a.googleSignInSuccess(response.tokenId);
      dispatch(action);
    }
  };

  handleLoginFailure = (response) => {
    console.log(response);
    alert("Failed to log in");
  };
  render() {
    return (
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={this.login}
        onFailure={this.handleLoginFailure}
        cookiePolicy={"single_host_origin"}
        responseType="code,token"
      />
    );
  }
}

GoogleLogIn = connect()(GoogleLogIn);

export default GoogleLogIn;
