import React from "react";

const SearchOne = () => {
  const searchInputStyles = {
    fontSize: "0.7em",
    // backgroundColor: "#56606a",
    border: "solid 2px #6c757d",
  };

  const formStyles = {
    display: "flex",
    justifyContent: "space-around",
  };

  const searchButtonStyles = {
    borderRadius: "10px",
    border: "3px solid #003100",
    color: "#343a40",
    fontWeight: "bold",
  };
  return (
    <React.Fragment>
      <form style={formStyles}>
        <div>
          <input
            style={searchInputStyles}
            type="text"
            className="form-control"
            placeholder="Search This Journal"
            aria-label="Search This Journal"
            id="search-one-input"
          />
        </div>
        <div>
          <button
            style={searchButtonStyles}
            type="submit"
            className="btn btn-sm ml-2"
          >
            Search
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchOne;
