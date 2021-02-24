import { useState, useEffect } from "react";
import IngredientInput from "../IngredientInput/IngredientInput.js";

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
    <article className="center mw6 br3 ttc bg-nearwhite w-90 w-80-m w-50-ns hidden shadow-4 ba b--black-10 mv4">
      <div className="bg-dark-gray ph4 br3 flex br--bottom justify-between items-center">
        <h2 className="white dib mr3">Odd Bits</h2>
      </div>
      <div className="pa3 bt flex flex-column b--black-10 center flex">
        <IngredientInput inputList={inputList} setInputList={setInputList} />
      </div>
    </article>
  );
};

export default OddBits;
