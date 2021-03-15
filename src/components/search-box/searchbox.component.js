import React from "react";

const SearchBox = ({ searchField, searchChange }) => {
  return (
    <div className="pa2 tc w-100 center pv2  bg-nearwhite shadow-4 br3">
      <input
        className="ma1 pa2 w-80-m input-reset ba bg-transparent br2 hover-bg-light-gray w-50-ns w-90"
        type="search"
        placeholder="Search Recipes"
        onChange={searchChange}
        value={searchField}
      />
    </div>
  );
};

export default SearchBox;
