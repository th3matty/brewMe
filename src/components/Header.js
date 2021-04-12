import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";
import { ReactComponent as Home } from "../svg/home.svg";
import { ReactComponent as Logout } from "../svg/logout.svg";
import defaultUserPic from "../dist/avatars/boy_default.png";

function CalltoActionWidget({
  user,
  token,
  setUser,
  setToken,
  setRefreshToken,
}) {
  if (user === null || user === undefined || user === "") {
    return (
      <>
        <Link
          className="bg-blue-500 font-bold text-m rounded text-white w-20 h-8"
          to={ROUTES.LOGIN}
        >
          {" "}
          Login
        </Link>

        <Link
          className="font-bold text-m rounded text-blue w-20 h-8"
          to={ROUTES.SIGN_UP}
        >
          {" "}
          Sign Up
        </Link>
      </>
    );
  } else {
    return (
      <>
        {/* Dashboard */}
        <div className="cursor-pointer">
          <Link to={ROUTES.DASHBOARD}>
            <Home className="mt-4 mr-3" title="Dashboard" />
          </Link>
        </div>
        {/* Profile */}
        <div className="cursor-pointer">
          <Link to={user.username && `/p/${user.username}`}>
            <img
              className="rounded-full h-8 w-8 flex mr-4 mt-4"
              title="Profile"
              src={defaultUserPic}
              alt={user.username && `/p/${user.username}`}
            />
          </Link>
        </div>
        {/* SignOut */}
        <Link to={ROUTES.LOGIN}>
          <Logout
            className="mt-4 mr-2"
            title="Sign Out"
            onClick={() => {
              setUser(null);
              setToken("");
              setRefreshToken("");
            }}
          />
        </Link>
      </>
    );
  }
}

function Header() {
  const { user, setUser, setToken, setRefreshToken, token } = useContext(
    UserContext
  );

  useEffect(() => {
    document.title = "BrewMe - Dashboard";
    console.log("Header - rendert");
  }, []);

  return (
    <header className="h-16 bg-white border-b mb-8">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
              <BrewMeLogo alt="BrewMe" />
            </Link>
          </div>
          <div className="text-gray text-center flex items-center align-items justify-spacebetween">
            {/* {user, setUser, setToken, setRefreshToken} */}
            <CalltoActionWidget
              user={user}
              token={token}
              setUser={setUser}
              setToken={setToken}
              setRefreshToken={setRefreshToken}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
