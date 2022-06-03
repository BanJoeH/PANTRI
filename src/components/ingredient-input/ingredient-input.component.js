import { useEffect } from "react";
import usePrevious from "../../App/usePrevious";

import "./ingredient-input.stytles.scss";

const IngredientInput = ({
  inputList,
  setInputList,
  lossOfFocus,
  label = "Ingredient",
}) => {
  const previousLength = usePrevious(inputList.length);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const index = e.target.value;

    const list = [...inputList];
    if (inputList.length > 1) {
      list.splice(index, 1);
      setInputList(list);
    } else if (inputList.length === 1) {
      list[0].ingredient = "";
      setInputList(list);
    }
  };

  const handleAddClick = () => {
    setInputList([...inputList, { ingredient: "", ingredientRef: null }]);
  };

  const addIngredientOnEnter = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  useEffect(() => {
    console.log(inputList.length, previousLength)
    if (inputList.length > previousLength && inputList[inputList.length - 1].ingredientRef) {
      inputList[inputList.length - 1].ingredientRef.focus();
    }
  }, [inputList.length, inputList, previousLength]);

  return inputList.map((x, i) => {
    return (
      <div key={i} className="ingredient-input-group">
        <div className="group">
          <input
            id={x.ingredient + i}
            name="ingredient"
            label={label}
            onChange={(e) => handleInputChange(e, i)}
            value={x.ingredient}
            onKeyDown={(e) => addIngredientOnEnter(e)}
            ref={(e) => (x.ingredientRef = e)}
            autoComplete="off"
            className="form-input"
            onBlur={lossOfFocus}
          />

          <label
            htmlFor={x.ingredient + i}
            className={`${
              x.ingredient.length ? "shrink" : ""
            } form-input-label`}
          >
            {label}
          </label>
        </div>

        <div className="button-group">
          {inputList.length - 1 === i && (
            <div className="ingredient-button">
              <button onClick={handleAddClick} className="add">
                &#10005;
              </button>
            </div>
          )}

          <button
            value={i}
            onClick={handleRemoveClick}
            className="ingredient-button delete"
          >
            &#10005;
          </button>
        </div>
      </div>
    );
  });
};
export default IngredientInput;
