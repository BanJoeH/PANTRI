import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';


const ShoppingList = React.lazy(() =>
  import("../shopping-list/shopping-list.component.js")
);
const Recipes = React.lazy(() => import("../recipes/recipes.component.js"));

export default function Home() {
    const history = useHistory();
    const {tab} = useParams();
    console.log(tab)
    const onChangeIndex = (index) => {
        history.push(`/home/${index}`);
    };

    return (
        <React.Suspense fallback={<div>...loading</div>}>
            <SwipeableViews enableMouseEvents index={tab === 'shopping-list' ? 0 : 1} onChangeIndex={onChangeIndex}>
            <ShoppingList />
            <Recipes />
            </SwipeableViews>
        </React.Suspense>
    )
}