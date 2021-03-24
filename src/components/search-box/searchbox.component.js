import React from "react";
import CustomInput from "../custom-input/custom-input.component";

import "./searchbox.styles.scss";

const SearchBox = ({ searchField, searchChange }) => {
  return (
    <div className="searchbox">
      <CustomInput
        type="search"
        label="Search Recipes - NOT WORKING"
        onChange={searchChange}
        value={searchField}
      />
    </div>
  );
};

export default SearchBox;
