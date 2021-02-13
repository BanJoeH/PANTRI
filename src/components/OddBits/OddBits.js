import { useState, useEffect } from "react";
import IngredientInput from "../IngredientInput/IngredientInput.js";

// let defaultState = {
// if (oddbits.length > 0) {
//   oddBits.map((item) => {
//     return { ingredient: item, ingredientRef: null }
// })} else {
//   return [{ ingredient: "", ingredientRef: null }]
// }
// }

const OddBits = ({ setOddBits, oddBits }) => {
  let defaultState = () => {
    if (oddBits.length > 0) {
      oddBits.map((item) => {
        return { ingredient: item, ingredientRef: null };
      });
    } else {
      return [{ ingredient: "", ingredientRef: null }];
    }
  };
  const [inputList, setInputList] = useState(defaultState);

  useEffect(() => {
    let ingredients = inputList.map((input, i) => {
      return input.ingredient;
    });
    setOddBits(ingredients);
  }, [inputList]);

  return (
    <article className="center mw6 br3 ttc hidden shadow-4 ba b--black-10 mv4">
      <div className="bg-dark-gray ph3 flex br--bottom justify-between items-center">
        <h2 className="white dib mr3">Odd Bits</h2>
      </div>
      <div className="pa3 bt b--black-10 center flex">
        <IngredientInput inputList={inputList} setInputList={setInputList} />
      </div>
    </article>
  );
};

export default OddBits;
