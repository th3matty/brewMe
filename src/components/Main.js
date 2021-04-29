import React, { lazy } from "react";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import ShowAndSearchUser from "./showUser/ShowAndSearchUser";

const CreateRecipe = lazy(() => import("../pages/createRecipe"));

function MainCointaner() {
  let match = useRouteMatch();

  return (
    <div>
      <ShowAndSearchUser />
      Hello from MainCointaner
      <Switch>
        <Route path={`${match.path}createrecipe`} component={CreateRecipe} />
      </Switch>
    </div>
  );
}

const Main = withRouter(MainCointaner);
export default Main;
