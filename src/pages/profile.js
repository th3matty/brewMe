import React, { useState, useEffect, useContext } from "react";
import PrefetchFunction from "../hooks/usePrefetch";
import { UserContext } from "../context/user";

import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { ReactComponent as Home } from "../svg/home.svg";

export default function Profile() {
  const [auth, setAuth] = useState(false);

  const { user } = useContext(UserContext);

  const checkPrefetch = PrefetchFunction()
    .then((res) => setAuth(res))
    .catch((err) => console.log("err in porfile:", err));

  useEffect(() => {
    document.title = "BrewMe - Profile";
    console.log("Profile rendert");
  }, []);
  return (
    <>
      {/* Dashboard */}
      <div className="cursor-pointer">
        <Link to={ROUTES.DASHBOARD}>
          <Home className="mt-4 mr-3" title="Dashboard" />
        </Link>
      </div>
      {auth === true ? <p>Yes, user is autheticated </p> : <p>Loading... </p>}
    </>
  );
}
