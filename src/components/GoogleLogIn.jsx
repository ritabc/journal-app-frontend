import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import * as a from "../actions";
import * as e from "../api/errors";

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
const HOST = `${process.env.REACT_APP_API_HOST}`;

class GoogleLogIn extends React.Component {
  login = (response) => {
    const { dispatch } = this.props;
    if (response.accessToken) {
      let authenticationIsLoadingAction = a.toggleAuthenticationStatusChangeIsComplete();
      let googleSignInSuccessAction = a.googleSignInSuccess(response.tokenId);

      dispatch(authenticationIsLoadingAction);
      dispatch(googleSignInSuccessAction);

      //   Try logging in first
      let tokenData = JSON.stringify({
        user: { google_id_token: response.tokenId },
      });
      fetch(`${HOST}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: tokenData,
      })
        .then((response) => response.json())
        .then((response) => {
          if ("error" in response) {
            if (response.error === e.USER_NOT_FOUND) {
              // If receive user not found error, sign the user up instead
              fetch(`${HOST}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: tokenData,
              })
                .then((response) => response.json())
                .then((response) => {
                  // We have logged in a user for the first time
                  const { given_name, family_name, email, id } = response.user;
                  const saveUserAction = a.addCurrentUser({
                    jwt: response.token,
                    givenName: given_name,
                    familyName: family_name,
                    email: email,
                    userId: id,
                  });
                  dispatch(saveUserAction);
                  let authenticationDoneLoadingAction = a.toggleAuthenticationStatusChangeIsComplete();
                  dispatch(authenticationDoneLoadingAction);
                });
            }
          } else {
            // We have logged in a user
            const { given_name, family_name, email, id } = response.user;
            const saveUserAction = a.addCurrentUser({
              jwt: response.token,
              givenName: given_name,
              familyName: family_name,
              email: email,
              userId: id,
            });
            dispatch(saveUserAction);
            let authenticationDoneLoadingAction = a.toggleAuthenticationStatusChangeIsComplete();
            dispatch(authenticationDoneLoadingAction);
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(a.toggleAuthenticationStatusChangeIsComplete());
          alert(`Failed to log in: ${error}`);
        });
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
        buttonText="Sign In"
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
