import { FocusEvent, KeyboardEvent, MouseEvent, useEffect } from "react";
import usePrevious from "../../App/usePrevious";

import "./ingredient-input.styles.scss";

// A row in the ingredient input list. Callers can pile on extra fields
// (e.g. OddBits adds `purchased`) and we'll round-trip them through
// `updateList` untouched — only `ingredient` and `ingredientRef` are
// managed here.
export type IngredientInputItem = {
  ingredient: string;
  ingredientRef: HTMLInputElement | null;
  [key: string]: unknown;
};

type IngredientInputProps = {
  inputList: IngredientInputItem[];
  updateList: (list: IngredientInputItem[]) => void;
  label?: string;
};

const IngredientInput = ({
  inputList,
  updateList,
  label = "Ingredient",
}: IngredientInputProps): JSX.Element => {
  const previousLength = usePrevious(inputList.length);
  const handleBlur = (e: FocusEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    const list = [...inputList];
    const row = list[index];
    if (!row) return;
    row.ingredient = value;
    updateList(list);
  };

  const handleRemoveClick = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    e.preventDefault();
    const list = [...inputList];
    if (inputList.length > 1) {
      list.splice(index, 1);
      updateList(list);
    } else if (inputList.length === 1 && list[0]) {
      list[0].ingredient = "";
      updateList(list);
    }
  };

  const handleAddClick = (): void => {
    updateList([...inputList, { ingredient: "", ingredientRef: null }]);
  };

  const addIngredientOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  useEffect(() => {
    const last = inputList[inputList.length - 1];
    if (
      previousLength !== undefined &&
      inputList.length > previousLength &&
      last?.ingredientRef
    ) {
      last.ingredientRef.focus();
    }
  }, [inputList.length, inputList, previousLength]);

  return (
    <>
      {inputList.map((x, i) => (
        <div key={x.ingredient + i} className="ingredient-input-group">
          <div className="group">
            <input
              id={x.ingredient + i}
              name="ingredient"
              defaultValue={x.ingredient}
              onKeyDown={(e) => addIngredientOnEnter(e)}
              ref={(e) => {
                x.ingredientRef = e;
              }}
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
                <button onClick={handleAddClick} className="add" type="button">
                  &#10005;
                </button>
              </div>
            )}

            <button
              value={i}
              onClick={(e) => handleRemoveClick(e, i)}
              className="ingredient-button delete"
              type="button"
            >
              &#10005;
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default IngredientInput;
