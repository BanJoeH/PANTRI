import { useEffect } from "react";
import usePrevious from "../../App/usePrevious";

import "./ingredient-input.stytles.scss";

const IngredientInput = ({
  inputList,
  updateList,
  label = "Ingredient",

}) => {
  const previousLength = usePrevious(inputList.length);
  const handleBlur = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    updateList(list);
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const list = [...inputList];
    if (inputList.length > 1) {
      list.splice(index, 1);
      updateList(list);
    } else if (inputList.length === 1) {
      list[0].ingredient = "";
      updateList(list);
    }
  };

  const handleAddClick = () => {
    updateList([...inputList, { ingredient: "", ingredientRef: null }]);
  };

  const addIngredientOnEnter = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  useEffect(() => {
    if (inputList.length > previousLength && inputList[inputList.length - 1].ingredientRef) {
      inputList[inputList.length - 1].ingredientRef.focus();
    }
  }, [inputList.length, inputList, previousLength]);

  return inputList.map((x, i) => {
    return (
      <div key={x.ingredient + i} className="ingredient-input-group">
        <div className="group">
          <input
            id={x.ingredient + i}
            name="ingredient"
            label={label}
            defaultValue={x.ingredient}
            onKeyDown={(e) => addIngredientOnEnter(e)}
            ref={(e) => (x.ingredientRef = e)}
            autoComplete="off"
            className="form-input"
            onBlur={(e) => handleBlur(e, i)}
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
