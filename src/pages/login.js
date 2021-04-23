import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import * as ROUTES from "../constants/routes";
import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";
import {
  graphQl_Uri,
  userLoginMethodGraphQl,
  queryGetUserDetails,
} from "../services/graphQlQueries";
import Background from "../dist/wallpapertip_bier-wallpaper_496226.jpg";

export default function Login({ getUserObjAndToken }) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [helper, setHelpler] = useState("");
  const isInvalid = password === "" || userName === "";

  const { setUser, setToken, setRefreshToken } = useContext(UserContext);

  // mongoDB queries/methods from services
  const loginUser = userLoginMethodGraphQl(userName, password);
  const getUserDetails = queryGetUserDetails();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const queryLogin = await fetch(graphQl_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      const resultLogin = await queryLogin.json();

      const { errors } = resultLogin;
      if (errors) {
        const error = errors[0].message;
        throw new Error(error);
      }

      const { token, refreshToken } = resultLogin.data.login;

      if (!token && !refreshToken) {
        throw new Error("Token not found!");
      }

      const queryGetUser = await fetch(graphQl_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(getUserDetails),
      });

      const resultUserDetails = await queryGetUser.json();

      // pass USER-Obj and Tokens to Context.Provider
      if (resultUserDetails) {
        setUser(resultUserDetails.data.getUserDetails);
        setToken(token);
        setRefreshToken(refreshToken);
        setHelpler("Success, Dashboard incoming... \u{1F37A}");
        setTimeout(() => history.push(ROUTES.DASHBOARD), 500);
      }
    } catch (err) {
      console.log(err);
      setUserName("");
      setPassword("");
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "BrewMe - Login";
  }, []);
  return (
    <div
      className="flex flex-col mx-auto w-full h-full items-center h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {helper && <p className="m-4 text-l text-green-500">{helper}</p>}
      {error && <p className="m-4 text-l text-red-500"> {error}</p>}
      <BrewMeLogo className="w-32 h-32"/>
      <div className="flex items-center bg-white p-4 border mb-4 mt-4 rounded-br-lg">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            aria-label="enter your user name"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your User Name"
            onChange={({ target }) => setUserName(target.value)}
            value={userName}
            onFocus={() => setUserName("")}
          />
          <input
            type="password"
            aria-label="enter your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col  bg-white p-4 border rounded-br-lg">
        <p className="text-m"> Dont have an account?</p>
        <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
      </div>
    </div>
  );
}
