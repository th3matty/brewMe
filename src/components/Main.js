import React, {lazy, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import ShowAndSearchUser from "./showUser/ShowAndSearchUser";
//import CreateRecipe from "../pages/createRecipe";

const CreateRecipe = lazy(() => import("../pages/createRecipe"));

function MainCointaner({ ...props }) {
  const { match } = props;

  useEffect(() => {
    console.log("props aus main:", props, match);
  });

  return (
    <div>
      <ShowAndSearchUser />
      Hello from MainCointaner
      <Switch>
        <Route
          exact
          path={match.url + "createrecipe"}
        />
      </Switch>
    </div>
  );
}

const Main = withRouter(MainCointaner);
export default Main;
