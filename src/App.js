import "./App.css";
import React, { lazy, Suspense } from "react";

import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import { HashRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/notfound"));

function App() {
  const { user} = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <HashRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
            <Route path={ROUTES.PROFILE} component={Profile} exact />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} exact />
          </Switch>
        </Suspense>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
