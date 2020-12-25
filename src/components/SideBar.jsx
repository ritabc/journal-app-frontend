import { findByLabelText } from "@testing-library/react";
import React from "react";

const SideBar = () => {
  const sideBarStyles = {
    minHeight: "100vh",
  };

  const titleStyles = {
    // borderBottomColor: "rgba(114,0,114,1)",
  };

  const searchInputStyles = {
    fontSize: "0.7em",
  };

  const formStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const searchButtonStyles = {
    borderRadius: "10px",
  };

  return (
    <React.Fragment>
      <div className="bg-light" style={sideBarStyles}>
        <h3 className="p-2">My Journals</h3>
        <form style={formStyles}>
          <div>
            <input
              style={searchInputStyles}
              type="text"
              className="form-control"
              placeholder="Search All Journals"
              aria-label="Search All Journals"
            />
          </div>
          <div>
            <button
              style={searchButtonStyles}
              type="submit"
              className="btn btn-sm btn-success"
            >
              Search
            </button>
          </div>
        </form>
        <ul>
          <li>
            {/* <a href="#"> */}
            <strong>Daily Notes</strong>
            {/* </a> */}
          </li>
          <li>Introspective Notes</li>
          <li>Dream Diary</li>
          <li>Travel / Trips</li>
          <li>Recipes</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
