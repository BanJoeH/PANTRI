import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

const ShoppingList = React.lazy(
  () => import("../shopping-list/shopping-list.component"),
);
const Recipes = React.lazy(() => import("../recipes/recipes.component"));

export default function Home() {
  const history = useHistory();
  const { tab } = useParams();
  const onChangeIndex = (index) => {
    history.push(`/home/${index === 0 ? "shopping-list" : "recipes"}`);
  };

  return (
    <React.Suspense fallback={<div>...loading</div>}>
      <SwipeableViews
        enableMouseEvents
        index={tab === "shopping-list" ? 0 : 1}
        onChangeIndex={onChangeIndex}
      >
        <ShoppingList />
        <Recipes />
      </SwipeableViews>
    </React.Suspense>
  );
}
