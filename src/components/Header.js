import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";
import { ReactComponent as LogoutIcon } from "../svg/logout.svg";

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
        {/* Profile */}
        <div className="cursor-pointer">
          <Link to={user.username && `/p/${user.username}`}>
            {user.settings.avatarURI !== "" ? (
              <img
                className="rounded-full h-8 w-8 flex mr-4 mt-1"
                title="Profile"
                src={
                  process.env.PUBLIC_URL +
                  IMG_PATH +
                  `${user.settings.avatarURI}`
                }
                alt={user.username && `/p/${user.username}`}
              />
            ) : (
              <img
                className="rounded-full h-8 w-8 flex mr-4 mt-1"
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
            className="mt-1 mr-2"
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
  }, []);

  return (
    <header className="relative bg-yellow-300 bg-opacity-75 border-b mb-8">
      <div className="flex justify-center md:mx-auto h-full flex md:justify-end">
        <div className="flex h-full mt-3">
            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
              <BrewMeLogo alt="BrewMe" className="mt-2 mr-8 mb-2 cursor-pointer" />
            </Link>
          <div className="flex text-center items-center mr-2 mb-2 ">
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
