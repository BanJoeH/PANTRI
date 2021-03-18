import { useEffect } from "react";

import "./ingredient-input.stytles.scss";

const IngredientInput = ({ inputList, setInputList, label }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
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
    if (inputList[inputList.length - 1].ingredientRef) {
      inputList[inputList.length - 1].ingredientRef.focus();
    }
  }, [inputList.length]);

  return inputList.map((x, i) => {
    return (
      <div key={i} className="ingredient-input-group">
        <div className="group">
          <input
            name="ingredient"
            label={label ? label : `Ingredient`}
            onChange={(e) => handleInputChange(e, i)}
            value={x.ingredient}
            onKeyDown={(e) => addIngredientOnEnter(e)}
            ref={(e) => (x.ingredientRef = e)}
            autoComplete="off"
            className="form-input"
          />
          {label ? (
            <label
              className={`${
                x.ingredient.length ? "shrink" : ""
              } form-input-label`}
            >
              {label}
            </label>
          ) : null}
        </div>

        <div className="button-group">
          {inputList.length - 1 === i && (
            <div className="ingredient-button">
              <button onClick={handleAddClick} className="add">
                &#10005;
              </button>
            </div>
          )}
          {inputList.length !== 1 && (
            <button
              onClick={() => handleRemoveClick(i)}
              className="ingredient-button delete"
            >
              &#10005;
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default IngredientInput;
