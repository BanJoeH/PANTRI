import { ChangeEvent, MouseEvent, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { notification } from "../../App/app.utils";
import {
  filteredRecipesByIngredientAndName,
  updateRecipe,
} from "./recipes.utils";

import {
  addToFirebaseCollection,
  removeFromFirebaseCollection,
} from "../../App/app.utils";
import { useAppSelector } from "../../App/hooks";
import useDebounce from "../../App/useDebounce.utils";
import CardList from "../../components/cardList/card-list.component";
import type { EditingRecipe } from "../../components/edit-recipe/edit-recipe.component";
import EditRecipe from "../../components/edit-recipe/edit-recipe.component";
import NewRecipe from "../../components/new-recipe/new-recipe.component";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";
import SearchBox from "../../components/search-box/searchbox.component";
import type { CardRecipe, RecipeTemplate, ShoppingRecipe } from "../../types";
import { normalizeIngredient } from "../shopping-list/shopping-list.utils";

const Recipes = (): JSX.Element | null => {
  const [editingRecipe, setEditingRecipe] = useState<EditingRecipe>({
    id: "",
    name: "",
    link: "",
    ingredients: [],
  });
  const [searchField, setSearchField] = useState("");
  const debouncedSearchTerm = useDebounce(searchField, 200);

  const firestore = useFirestore();
  const uid = useAppSelector((state) => state.firebase.auth.uid);
  const recipesObject = useAppSelector(
    (state) =>
      state.firestore.ordered.recipes as unknown as
        | RecipeTemplate[]
        | undefined,
  );
  const recipes: CardRecipe[] = (recipesObject || []).map((value) => ({
    ...value,
    id: value.id,
    ingredients: value.ingredients.map((ingredient) => ({
      name: ingredient,
    })),
  }));
  const isloading = useAppSelector(
    (state) => state.firestore.status.requesting.recipes,
  );
  const loaded = useAppSelector(
    (state) => state.firestore.status.requested.recipes,
  );
  const recipesFiltered = filteredRecipesByIngredientAndName(
    recipes,
    debouncedSearchTerm,
  );
  const shoppingListCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("shoppingList");

  const recipesCollectionRef = firestore
    .collection("users")
    .doc(uid)
    .collection("recipes");

  const handleRemoveFromRecipesClick = async (
    e: MouseEvent<HTMLButtonElement>,
    recipe: CardRecipe,
  ) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${recipe.name}?`,
      )
    ) {
      const response = await removeFromFirebaseCollection(
        recipe,
        recipesCollectionRef,
      );
      if (response === "error") {
        notification(
          "Error",
          "error removing recipe, please try again",
          "danger",
        );
      } else {
        notification(response.name, "Deleted", "success");
      }
    }
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  const handleAddToShoppingListClick = async (
    e: MouseEvent<HTMLButtonElement>,
    recipe: CardRecipe,
  ) => {
    e.preventDefault();
    const payload: ShoppingRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.map(normalizeIngredient),
    };
    const response = await addToFirebaseCollection(
      payload,
      shoppingListCollectionRef,
    );
    if (response === "error") {
      notification("Error", "error adding to shopping list", "danger");
    } else {
      notification(response.name, "Added to your shopping list", "success");
      setSearchField("");
    }
  };

  const handleEditRecipeCardButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    recipe: CardRecipe,
  ) => {
    e.preventDefault();
    if (recipe === undefined) {
      notification(
        "error",
        "error finding recipe, please contact admin to resolve issue",
        "danger",
      );
    } else {
      setEditingRecipe({
        ...recipe,
        link: recipe.link || "",
        ingredients: recipe.ingredients.map((ingredient) => ingredient.name),
      });
    }
  };

  const handleUpdateRecipeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await updateRecipe(editingRecipe, recipesCollectionRef);
    if (response === "succeeded") {
      setEditingRecipe({
        id: "",
        name: "",
        link: "",
        ingredients: [],
      });
      notification(editingRecipe.name, "updated", "info");
    } else {
      notification("Error", "error updating recipe, please try again", "info");
    }
  };

  if (isloading) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeaderContainer title="Recipe List">
        <EditRecipe
          editingRecipe={editingRecipe}
          setEditingRecipe={setEditingRecipe}
          updateRecipe={handleUpdateRecipeClick}
        />
        <NewRecipe />
        <SearchBox searchChange={onSearchChange} searchField={searchField} />
      </PageHeaderContainer>
      {loaded && recipesFiltered.length ? (
        <CardList
          recipes={recipesFiltered}
          removeFromRecipes={handleRemoveFromRecipesClick}
          cardButton={handleAddToShoppingListClick}
          editRecipeCardButton={handleEditRecipeCardButtonClick}
        />
      ) : searchField ? (
        <div className="card">
          <h2>Recipe not found.</h2>
        </div>
      ) : (
        <div className="card">
          <h2>No recipes in your recipe list.</h2>
          <h2>Click add a recipe above to add some!</h2>
        </div>
      )}
    </PageContainer>
  );
};

export default Recipes;
