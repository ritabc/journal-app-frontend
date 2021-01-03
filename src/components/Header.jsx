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

  const logOutBtnStyles = {
    color: "#f8f9fa",
    border: "3px solid #5A2762",
    borderRadius: "10px",
  };

  const innerBorderStyles = {
    border: "6px solid #212529",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
  };

  let currentUserWelcome = null;
  let logOutBtn = null;

  if (Object.keys(props.currentUser).length >= 1) {
    currentUserWelcome = (
      <span className="me-3">Logged In As {props.currentUser.givenName}</span>
    );
  } else {
    logOutBtn = <GoogleLogOut />;
  }
  return (
    <React.Fragment>
      <div className="bg-dark py-3 px-3 mb-0" style={headerStyles}>
        <h1 style={titleStyles}>JournalRecorder</h1>
        <div className="my-auto">
          {currentUserWelcome}
          <div style={logOutBtnStyles}>
            <div style={innerBorderStyles}>{logOutBtn}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
