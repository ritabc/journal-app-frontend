import React from "react";

const Header = () => {
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    color: "#f8f9fa",
  };

  const titleStyles = {
    // color: "#f8f9fa",
  };

  const logOutBtnStyles = {
    // backgroundColor: "#5A2762",
    color: "#f8f9fa",
    border: "3px solid #5A2762",
  };

  return (
    <React.Fragment>
      <div className="bg-dark py-3 px-3 mb-0" style={headerStyles}>
        <h1 style={titleStyles}>JournalRecorder</h1>
        <div className="my-auto">
          <span className="mr-3">Logged In As Rita</span>
          <button className="btn" style={logOutBtnStyles}>
            Log Out
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
