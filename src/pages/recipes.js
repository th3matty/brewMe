import React from "react";
import { withRouter } from "react-router-dom";

function RecipesContainer() {
  return (
    <div>
      <h1>Your Recipes</h1>
    </div>
  );
}

const Recipe = withRouter(RecipesContainer);
export default Recipe;
