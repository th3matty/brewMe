import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import UserContextProvider from "./context/user";
import { Switch, Route, withRouter } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/notfound"));


function App(props) {
  
  useEffect(() => {
    console.log("App rendert");
    console.log("props aus APP:", props);
  }, [props]);

  return (
    <UserContextProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} render={() => <Login />} exact />
          <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
          <Route path={ROUTES.PROFILE} component={Profile} exact />
          <Route path={ROUTES.NOT_FOUND} component={NotFound} exact/>
          <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
        </Switch>
      </Suspense>
    </UserContextProvider>
  );
}

export default withRouter(App);
