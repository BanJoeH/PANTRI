import React from "react";
import Card from "../../components/card/card.component";
import Masonry from "react-masonry-css";

import "./card-list.styles.scss";

function CardList({
  recipes,
  removeFromRecipes,
  cardButton,
  editRecipeCardButton,
  ingredientButton,
}) {
  const numOfColumns = () => {
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
  const sortCompareByName = (a, b) => {
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
