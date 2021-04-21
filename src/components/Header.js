import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";
import { ReactComponent as HomeIcon } from "../svg/home.svg";
import { ReactComponent as LogoutIcon } from "../svg/logout.svg";
import defaultUserPic from "../dist/avatars/boy_default.png";

function CalltoActionWidget({ user, setUser, setToken, setRefreshToken }) {
  const IMG_PATH = "/avatars/";
  const avatar = "/default_user.png";

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
            <HomeIcon className="mt-4 mr-3" title="Dashboard" />
          </Link>
        </div>
        {/* Profile */}
        <div className="cursor-pointer">
          <Link to={user.username && `/p/${user.username}`}>
            {user.settings.avatarURI !== "" ? (
              <img
                className="rounded-full h-8 w-8 flex mr-4 mt-4"
                title="Profile"
                src={process.env.PUBLIC_URL + IMG_PATH + `${user.settings.avatarURI}`}
                alt={user.username && `/p/${user.username}`}
              />
            ) : (
              <img
                className="rounded-full h-8 w-8 flex mr-4 mt-4"
                title="Profile"
                src={process.env.PUBLIC_URL + IMG_PATH + `${avatar}`}
                alt={user.username && `/p/${user.username}`}
              />
            )}
          </Link>
        </div>
        {/* SignOut */}
        <Link to={ROUTES.LOGIN}>
          <LogoutIcon
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
  const { user, setUser, setToken, setRefreshToken } = useContext(UserContext);

  useEffect(() => {
    document.title = "BrewMe - Dashboard";
    console.log("Header - rendert", user);
  }, []);

  return (
    <header className="h-16 bg-yellow-300 bg-opacity-75 border-b mb-8">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
              <BrewMeLogo alt="BrewMe" className="ml-2" />
            </Link>
          </div>
          <div className="text-gray text-center flex items-center align-items justify-spacebetween">
            <CalltoActionWidget
              user={user}
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
