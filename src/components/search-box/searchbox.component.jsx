import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";

import "./searchbox.styles.scss";

const SearchBox = ({ searchField, searchChange }) => {
  const [showSearchBox, setShowSearchBox] = React.useState(false);
  return (
    <div className="searchbox">
      {showSearchBox ? (
        <CustomInput
          type="search"
          label="Search Recipes"
          onChange={searchChange}
          value={searchField}
          onBlur={() => setShowSearchBox(false)}
          autoFocus
        />
      ) : (
        <CustomButton
          className="searchbox__icon"
          onClick={() => setShowSearchBox(!showSearchBox)}
          
        >
          Search
        </CustomButton>
      )}
    </div>
  );
};

export default SearchBox;
