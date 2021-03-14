import "./App.css";
import React, { lazy, Suspense } from "react";

import { HashRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/notfound"));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
          <Route path={ROUTES.LOGIN} component={Login} exact />
          <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
          <Route path={ROUTES.PROFILE} component={Profile} exact />
          <Route path={ROUTES.NOT_FOUND} component={NotFound} exact />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default App;
