import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import UserContextProvider from "./context/user";
import { HashRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/notfound"));

function App() {
  useEffect(() => {
    console.log("App rendert");
  }, []);

  return (
    <UserContextProvider>
      <HashRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} render={() => <Login />} exact />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
            <Route path={ROUTES.PROFILE} component={Profile} exact />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} exact />
          </Switch>
        </Suspense>
      </HashRouter>
    </UserContextProvider>
  );
}

export default App;
