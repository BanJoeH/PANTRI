import React, { MouseEvent } from "react";
import Card from "../../components/card/card.component";
import Masonry from "react-masonry-css";
import type { CardRecipe } from "../../types";

import "./card-list.styles.scss";

type CardClickHandler = (
  e: MouseEvent<HTMLButtonElement>,
  recipe: CardRecipe,
) => void;

type IngredientButton = (
  ingredient: { name: string; purchased?: boolean },
  recipeId: string,
  ingredientIndex: number,
) => void;

type CardListProps = {
  recipes: CardRecipe[];
  removeFromRecipes: CardClickHandler;
  cardButton?: CardClickHandler;
  editRecipeCardButton?: CardClickHandler;
  ingredientButton?: IngredientButton;
};

function CardList({
  recipes,
  removeFromRecipes,
  cardButton,
  editRecipeCardButton,
  ingredientButton,
}: CardListProps): JSX.Element {
  const numOfColumns = (): number => {
    if (recipes.length < 3) {
      return recipes.length;
    } else {
      return 3;
    }
  };

  const breakpointColumnsObj = {
    default: numOfColumns(),
    1400: 2,
    1000: 1,
  };

  const copyRecipes = [...recipes];
  const sortCompareByName = (a: CardRecipe, b: CardRecipe): number => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="card-list fade-in">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {copyRecipes.sort(sortCompareByName).map((recipe) => {
          if (recipe !== null) {
            return (
              <Card
                removeFromRecipes={removeFromRecipes}
                recipe={recipe}
                key={recipe.id}
                button={cardButton}
                editRecipe={editRecipeCardButton}
                ingredientButton={ingredientButton}
              />
            );
          } else return null;
        })}
      </Masonry>
    </div>
  );
}

export default React.memo(CardList);
