import React from "react";
import GoogleLogOut from "./GoogleLogOut";
const Header = (props) => {
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    color: "#f8f9fa",
  };

  const titleStyles = {
    // color: "#f8f9fa",
  };
  const loggedInLogOutStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const welcomeStyles = {
    fontSize: "large",
    fontWeight: "500",
  };

  let currentUserWelcome = null;
  let logOutBtn = null;

  if (Object.keys(props.currentUser).length >= 1) {
    currentUserWelcome = (
      <span className="me-3">Logged In As {props.currentUser.givenName}</span>
    );
    logOutBtn = <GoogleLogOut />;
  }
  return (
    <React.Fragment>
      <div className="bg-dark py-3 px-3 mb-0" style={headerStyles}>
        <h1 style={titleStyles}>JournalRecorder</h1>
        <div className="my-auto" style={loggedInLogOutStyles}>
          <div style={welcomeStyles}>{currentUserWelcome}</div>
          <div>{logOutBtn}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
