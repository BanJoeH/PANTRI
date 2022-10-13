import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";

import "./searchbox.styles.scss";

const SearchBox = ({ searchField, searchChange }) => {
  const [showSearchBox, setShowSearchBox] = React.useState(false);
  return (
    <div className="searchbox">
      <CustomButton className="searchbox__icon" onClick={() => setShowSearchBox(!showSearchBox)}>
        {showSearchBox ? "Close search":"Search"}
      </CustomButton>
      {showSearchBox ? (
      <CustomInput
        type="search"
        label="Search Recipes"
        onChange={searchChange}
        value={searchField}
        onBlur={() => setShowSearchBox(false)}
      />
      ) : null}
    </div>
  );
};

export default SearchBox;
