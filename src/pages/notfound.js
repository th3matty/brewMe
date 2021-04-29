import React from "react";
import { withRouter } from "react-router-dom";

function NotFoundContainer() {
  return (
    <div>
      <p>Hello from NotFound</p>
    </div>
  );
}

const NotFound = withRouter(NotFoundContainer);
export default NotFound;
