import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { notification, addToFirebaseCollection } from "../../App/app.utils";
import { useAppSelector } from "../../App/hooks";
import CustomButton from "../custom-button/custom-button.component";
import IngredientInput, {
  type IngredientInputItem,
} from "../ingredient-input/ingredient-input.component";
import CustomInput from "../custom-input/custom-input.component";

type NewRecipeState = {
  name: string;
  link: string;
  ingredients: string[];
};

function NewRecipe(): JSX.Element {
  const [inputList, setInputList] = useState<IngredientInputItem[]>([
    { ingredient: "", ingredientRef: null },
  ]);
  const [newRecipe, setNewRecipe] = useState<NewRecipeState>({
    name: "",
    link: "",
    ingredients: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [showNewRecipeCard, setShowNewRecipeCard] = useState<boolean>(false);

  const firestore = useFirestore();
  const uid = useAppSelector((state) => state.firebase.auth.uid);
  const recipesCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("recipes");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddNewRecipeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newRecipe.name) {
      setError(true);
    } else {
      const response = await addToFirebaseCollection(
        newRecipe,
        recipesCollectionRef,
      );
      if (response === "error") {
        notification(
          "Error",
          "error adding new recipe, please try again",
          "danger",
        );
      } else {
        setError(false);
        notification(newRecipe.name, "Added to Recipes", "success");
        setNewRecipe({ name: "", link: "", ingredients: [] });
        setInputList([{ ingredient: "", ingredientRef: null }]);
        setShowNewRecipeCard(!showNewRecipeCard);
      }
    }
  };

  useEffect(() => {
    const ingredients = inputList
      .map((input) => input.ingredient.toLowerCase())
      .filter(Boolean);
    setNewRecipe({ ...newRecipe, ingredients: ingredients });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputList]);

  const handleShowNewRecipeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNewRecipeCard(!showNewRecipeCard);
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNewRecipeCard(false);
    setError(false);
  };

  return !showNewRecipeCard ? (
    <div style={{ margin: "0 5%" }}>
      <CustomButton value="newRecipe" onClick={handleShowNewRecipeClick}>
        Add a Recipe
      </CustomButton>
    </div>
  ) : (
    <div className="card">
      <h3 className="new-recipe-title">Add a new recipe</h3>
      <CustomInput
        name="name"
        label="Recipe Name"
        handleChange={handleChange}
        value={newRecipe.name}
        required
      />
      {error ? <div className="error">Recipe name required</div> : null}
      <CustomInput
        name="link"
        label="Link"
        handleChange={handleChange}
        value={newRecipe.link}
      />
      <IngredientInput
        inputList={inputList}
        // setInputList={setInputList}
        updateList={setInputList}
        label="Ingredient"
      />
      <div className="new-recipe-button-group">
        <CustomButton value="AddRecipe" onClick={handleAddNewRecipeClick}>
          Add Recipe
        </CustomButton>
        <CustomButton value="Cancel" onClick={handleCancelClick}>
          Cancel
        </CustomButton>
      </div>
    </div>
  );
}

export default NewRecipe;
