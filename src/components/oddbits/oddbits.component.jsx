import { useState, useEffect } from "react";
import IngredientInput from "../ingredient-input/ingredient-input.component.js";

const OddBits = ({ setOddBits, oddBits }) => {
  const [inputList, setInputList] = useState(
    oddBits.map((item) => ({ ingredient: item, ingredientRef: null }))
  );

  useEffect(() => {
    let ingredients = inputList.map((input, i) => {
      return input.ingredient;
    });
    setOddBits(ingredients);
  }, [inputList]);

  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-title">Odd Bits</h2>
      </div>
      <div className="card-body ">
        <IngredientInput
          inputList={inputList}
          setInputList={setInputList}
          label="Odd bit"
        />
      </div>
    </article>
  );
};

export default OddBits;
