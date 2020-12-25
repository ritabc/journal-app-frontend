import React from "react";

const Header = () => {
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
  };
  return (
    <React.Fragment>
      <div className="bg-light py-3 px-3 mb-0" style={headerStyles}>
        <h1>JournalRecorder</h1>
        <div className="my-auto">
          <span className="mr-3">Logged In As Rita</span>
          <button className="btn btn-info">Log Out</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
