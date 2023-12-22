import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { connect } from "react-redux";
import * as a from "../actions";
import * as e from "../api/errors";

const HOST = `${process.env.REACT_APP_API_HOST}`;

class LoginWithGoogle extends React.Component {
  login = async (response) => {
    const { dispatch } = this.props;
    let authenticationIsLoadingAction =
      a.toggleAuthenticationStatusChangeIsComplete();
    let googleSignInSuccessAction = a.googleSignInSuccess(response.tokenId);

    dispatch(authenticationIsLoadingAction);
    dispatch(googleSignInSuccessAction);

    //   Try logging in first
    let tokenData = JSON.stringify({
      user: {
        google_id_token: response.credential,
      },
    });
    const loginResponse = await fetch(`${HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tokenData,
    });
    const loginRespBody = await loginResponse.json();
    if ("error" in loginRespBody) {
      if (loginRespBody.error === e.USER_NOT_FOUND) {
        // If receive user not found error, sign the user up instead
        const signupResponse = await fetch(`${HOST}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: tokenData,
        });
        const signupRespBody = await signupResponse.json();
        // We have logged in a user for the first time
        const { given_name, family_name, email, id } = signupRespBody.user;
        const saveUserAction = a.addCurrentUser({
          jwt: signupRespBody.token,
          givenName: given_name,
          familyName: family_name,
          email: email,
          userId: id,
        });
        dispatch(saveUserAction);
        let authenticationDoneLoadingAction =
          a.toggleAuthenticationStatusChangeIsComplete();
        dispatch(authenticationDoneLoadingAction);
      } else {
        // auth error for some other reason
        dispatch(a.googleSignInFailure(loginRespBody.error));
        alert(loginRespBody.error);
      }
    } else {
      // We have logged in a user from the getgo
      const { given_name, family_name, email, id } = loginRespBody.user;
      const saveUserAction = a.addCurrentUser({
        jwt: loginRespBody.token,
        givenName: given_name,
        familyName: family_name,
        email: email,
        userId: id,
      });
      dispatch(saveUserAction);
      let authenticationDoneLoadingAction =
        a.toggleAuthenticationStatusChangeIsComplete();
      dispatch(authenticationDoneLoadingAction);
    }
  };

  handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  render() {
    return (
      <GoogleLogin
        text="Sign In"
        onSuccess={this.login}
        onError={this.handleLoginFailure}
      />
    );
  }
}

LoginWithGoogle = connect()(LoginWithGoogle);

export default LoginWithGoogle;
