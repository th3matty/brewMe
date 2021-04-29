import React, { lazy, useEffect } from "react";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import ShowAndSearchUser from "./showUser/ShowAndSearchUser";
//import CreateRecipe from "../pages/createRecipe";

// test -start
const CreateRecipe = lazy(() => import("../pages/createRecipe"));
// test-end

function MainCointaner({ ...props }) {
  //const { match } = props;
  let match = useRouteMatch();

  useEffect(() => {
    console.log("props aus main:", props, match);
  });

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
