import React from "react";

const SearchAll = () => {
  const searchInputStyles = {
    fontSize: "0.7em",
    backgroundColor: "#56606a",
    border: "solid 2px #f8f9fa",
  };

  const formStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const searchButtonStyles = {
    borderRadius: "10px",
    // backgroundColor: "#003100",
    color: "#f8f9fa",
    fontWeight: "bold",
    border: "3px solid #003100",
  };

  return (
    <React.Fragment>
      <form style={formStyles}>
        <div>
          <input
            style={searchInputStyles}
            type="text"
            className="form-control"
            placeholder="Search All Journals"
            aria-label="Search All Journals"
            id="search-all-input"
          />
        </div>
        <div>
          <button
            style={searchButtonStyles}
            type="submit"
            className="btn btn-sm"
          >
            Search
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchAll;
