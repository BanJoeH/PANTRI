import React, { ChangeEventHandler } from "react";
import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";

import "./searchbox.styles.scss";

type SearchBoxProps = {
  searchField: string;
  searchChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchBox = ({
  searchField,
  searchChange,
}: SearchBoxProps): JSX.Element => {
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
