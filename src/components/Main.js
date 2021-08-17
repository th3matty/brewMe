import React, { lazy } from "react";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import ShowAndSearchUser from "./showUser/ShowAndSearchUser";

const CreateRecipe = lazy(() => import("../pages/createRecipe"));
const Recipes = lazy(() => import("../pages/recipes"));
const Bierkombinat = lazy(() => import("../pages/bierkombinat"));

function MainCointaner() {
  let match = useRouteMatch();

  return (
    <div>
      <ShowAndSearchUser />
      Hello from MainCointaner
      <Switch>
        <Route path={`${match.path}createrecipe`} component={CreateRecipe} />
        <Route path={`${match.path}recipes`} component={Recipes} />
        <Route path={`${match.path}bierkombinat`} component={Bierkombinat} />
      </Switch>
    </div>
  );
}

const Main = withRouter(MainCointaner);
export default Main;
