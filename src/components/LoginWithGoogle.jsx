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
        // google_id_token: response.tokenId,
        google_id_token: response.credential,
      },
    });
    const resp1 = await fetch(`${HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tokenData,
    });
    console.log(resp1);
    const resp2 = await resp1.json();
    console.log(resp2);
    if ("error" in resp2) {
      if (resp1.error === e.USER_NOT_FOUND) {
        // If receive user not found error, sign the user up instead
        const resp3 = await fetch(`${HOST}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: tokenData,
        });
        console.log(resp3);
        const resp4 = await resp3.json();
        console.log(resp4);
        // We have logged in a user for the first time
        const { given_name, family_name, email, id } = resp4.user;
        const saveUserAction = a.addCurrentUser({
          jwt: resp4.token,
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
        dispatch(a.googleSignInFailure(resp2.error));
        alert(resp2.error);
      }
    } else {
      // We have logged in a user from the getgo
      const { given_name, family_name, email, id } = resp2.user;
      const saveUserAction = a.addCurrentUser({
        jwt: resp2.token,
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
    console.log(response);
    alert("Failed to log in");
  };
  render() {
    return (
      <GoogleLogin
        // clientId={CLIENT_ID}
        text="Sign In"
        onSuccess={this.login}
        onError={this.handleLoginFailure}
        // cookiePolicy={"single_host_origin"}
        // responseType="code,token"
      />
    );
  }
}

LoginWithGoogle = connect()(LoginWithGoogle);

export default LoginWithGoogle;
