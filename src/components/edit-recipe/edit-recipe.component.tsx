import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";
import IngredientInput, {
  type IngredientInputItem,
} from "../ingredient-input/ingredient-input.component";

// Editing state lives in the parent Recipes page; ingredients are flattened
// to plain strings while editing, then re-objectified on save.
export type EditingRecipe = {
  id: string;
  name: string;
  link: string;
  ingredients: string[];
};

type EditRecipeProps = {
  editingRecipe: EditingRecipe;
  setEditingRecipe: Dispatch<SetStateAction<EditingRecipe>>;
  updateRecipe: (e: MouseEvent<HTMLButtonElement>) => void;
};

const EditRecipe = ({
  editingRecipe,
  setEditingRecipe,
  updateRecipe,
}: EditRecipeProps): JSX.Element | null => {
  const [inputList, setInputList] = useState<IngredientInputItem[]>([
    {
      ingredient: "",
      ingredientRef: null,
    },
  ]);

  useEffect(() => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      ingredients: inputList.map((item) => item.ingredient).filter(Boolean),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputList]);

  useEffect(() => {
    let newState: IngredientInputItem[] = [];
    if (editingRecipe.id) {
      newState = editingRecipe.ingredients.map((ingredient) => ({
        ingredient: ingredient,
        ingredientRef: null,
      }));
    } else {
      newState = [
        {
          ingredient: "",
          ingredientRef: null,
        },
      ];
    }
    setInputList(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingRecipe.ingredients.length]);

  const handleInputEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditingRecipe({
      id: "",
      name: "",
      ingredients: [],
      link: "",
    });
  };

  return !editingRecipe.id ? null : (
    <article className="card">
      <h2>Edit Recipe</h2>

      <div className="card-body">
        <CustomInput
          name="name"
          label="Recipe Name"
          handleChange={handleInputEditChange}
          value={editingRecipe.name}
          autoComplete="off"
        />
        <CustomInput
          name="link"
          label="Link"
          handleChange={handleInputEditChange}
          value={editingRecipe.link}
          autoComplete="off"
        />
        <IngredientInput inputList={inputList} updateList={setInputList} />
      </div>
      <div className="new-recipe-button-group">
        <CustomButton value="editRecipe" onClick={updateRecipe}>
          Done
        </CustomButton>
        <CustomButton value="Cancel" onClick={handleCancelClick}>
          Cancel
        </CustomButton>
      </div>
    </article>
  );
};

export default EditRecipe;
