import IngredientInput from "../ingredient-input/ingredient-input.component";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { normalizeIngredient } from "../../pages/shopping-list/shopping-list.utils";

const OddBits = () => {
  const oddBits = useSelector((state) => state.firebase.profile.oddBits);
  const { uid } = useSelector((state) => state.firebase.auth);

  const firestore = useFirestore();

  // We propagate `purchased` through the inputList so renames in
  // IngredientInput (which mutates entries in place) keep their tick.
  const inputList = oddBits?.length
    ? oddBits.map((item) => {
        const { name, purchased } = normalizeIngredient(item);
        return { ingredient: name, purchased, ingredientRef: null };
      })
    : [{ ingredient: "", purchased: false, ingredientRef: null }];

  // We deliberately don't filter empty entries here — IngredientInput uses
  // empty rows as the "add another" placeholder, and they need to round-trip
  // through Firestore so they stay rendered after re-fetch. Empty names are
  // filtered out where it matters (the sorted-shopping view).
  const updateOddBits = (newInputList) => {
    const updated = newInputList.map((i) => ({
      name: i.ingredient || "",
      purchased: i.purchased ?? false,
    }));
    firestore.collection("users").doc(uid).set(
      {
        oddBits: updated,
      },
      { merge: true },
    );
  };

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
