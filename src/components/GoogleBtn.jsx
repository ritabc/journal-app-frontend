import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// Store client_id elsewhere besides .env when deploying
const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

class GoogleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      accessToken: "",
      tokenId: "",
      profileObj: {},
    };
  }

  //   login = (response) => {
  //     if (response.accessToken) {
  //       this.setState((state) => ({
  //         isLoggedIn: true,
  //         accessToken: response.accessToken,
  //         tokenId: response.tokenId,
  //         profileObj: response.profileObj,
  //       }));
  //     }
  //   };

  //   logout = (response) => {
  //     this.setState((state) => ({
  //       isLoggedIn: false,
  //       accessToken: "",
  //       tokenId: "",
  //       profileObj: {},
  //     }));
  //   };

  //   handleLoginFailure = (response) => {
  //     console.log(response);
  //     alert("Failed to log in");
  //   };

  handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handlLogoutFailure}
          />
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
        {this.state.accessToken ? (
          <div>
            <h5>
              Your Access Token: <br />
              <br /> {this.state.accessToken}
            </h5>
            <h5>
              Your Token ID: <br />
              <br /> {this.state.tokenId}
            </h5>
            <h5>
              Your Profile ID: <br />
              <br /> {this.state.profileObj.googleId}
            </h5>
            <h5>
              Your Email: <br />
              <br /> {this.state.profileObj.email}
            </h5>
          </div>
        ) : null}
      </div>
    );
  }
}
export default GoogleBtn;
