import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

function CreateRecipeContainer(props) {
  useEffect(() => {
    console.log("props in createRecipe:", props);
  });
  return <div>create your own Recipe</div>;
}

const CreateRecipe = withRouter(CreateRecipeContainer);
export default CreateRecipe;
