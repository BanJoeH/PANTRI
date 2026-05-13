import React, { MouseEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import IngredientList from "../ingredient-list/ingredient-list.component";
import "./card.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import type { CardRecipe } from "../../types";

type CardClickHandler = (
  e: MouseEvent<HTMLButtonElement>,
  recipe: CardRecipe,
) => void;

type IngredientButton = (
  ingredient: { name: string; purchased?: boolean },
  recipeId: string,
  ingredientIndex: number,
) => void;

type CardProps = {
  recipe: CardRecipe;
  button?: CardClickHandler;
  ingredientButton?: IngredientButton;
  removeFromRecipes: CardClickHandler;
  editRecipe?: CardClickHandler;
  showBodyOnMount?: boolean;
};

function Card({
  recipe,
  button,
  ingredientButton,
  removeFromRecipes,
  editRecipe,
  showBodyOnMount,
}: CardProps): JSX.Element {
  const [showBody, setShowBody] = useState<boolean>(
    () => showBodyOnMount || false,
  );
  const { pathname } = useLocation();

  const toggleShowBody = (e: MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    setShowBody((state) => !state);
  };

  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-title" onClick={toggleShowBody}>
          {recipe.name}
        </h2>

        <div className="card-header-buttons">
          {recipe.link ? (
            <a
              className="title-link"
              target="_blank"
              rel="noopener noreferrer"
              href={recipe.link}
            >
              Link
            </a>
          ) : null}
          {pathname === "/home/recipes" ? (
            <>
              <button
                value={recipe.id}
                onClick={(e) => button?.(e, recipe)}
                className="rotate title-link"
              >
                &#10005;
              </button>
              <button
                value={recipe.id}
                onClick={(e) => editRecipe?.(e, recipe)}
                className="title-link"
              >
                Edit
              </button>
            </>
          ) : null}
          <button
            value={recipe.id}
            onClick={(e) => removeFromRecipes(e, recipe)}
            className=" title-link"
          >
            &#10005;
          </button>
        </div>
      </div>
      {showBody ? (
        <div className="card-body fade-in">
          {recipe.ingredients.length ? (
            <IngredientList
              recipeId={recipe.id}
              ingredients={recipe.ingredients}
              ingredientButton={ingredientButton}
            />
          ) : (
            <div>No ingredients</div>
          )}
          <CustomButton onClick={(e) => button?.(e, recipe)} value={recipe.id}>
            {pathname === "/home/shopping-list"
              ? "Done"
              : "Add to Shopping List"}
          </CustomButton>
        </div>
      ) : null}
    </article>
  );
}

export default Card;
