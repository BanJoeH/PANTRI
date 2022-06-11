import IngredientInput from "../ingredient-input/ingredient-input.component.js";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const OddBits = () => {
  const oddBits = useSelector((state) => state.firebase.profile.oddBits);
  const { uid } = useSelector((state) => state.firebase.auth);

  const firestore = useFirestore();

  const updateOddBits = (inputList) => {
    let ingredients = inputList.map((input) => {
      return input.ingredient;
    });
    firestore.collection("users").doc(uid).set(
      {
        oddBits: ingredients,
      },
      { merge: true }
    );
  };

  const inputList = oddBits?.map((item) => ({
    ingredient: item,
    ingredientRef: null,
  })) ?? [
    { ingredient: "", ingredientRef: null },
  ]

  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-title">Odd Bits</h2>
      </div>
      <div className="card-body ">
        <IngredientInput
          inputList={inputList}
          updateList={updateOddBits}
          label="Odd bit"
        />
      </div>
    </article>
  );
};

export default OddBits;
