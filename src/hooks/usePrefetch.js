import { useContext } from "react";
import { UserContext } from "../context/user";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";

import {
  graphQl_Uri,
  getRefreshTokenMethodGraphQL,
  queryGetUserDetails,
} from "../services/graphQlQueries";

const getRefreshToken = async (
  argRefreshToken,
  setToken,
  setRefreshToken,
  setUser
) => {
  const refreshTokenQuery = getRefreshTokenMethodGraphQL(argRefreshToken);

  try {
    const queryRefreshToken = await fetch(graphQl_Uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshTokenQuery),
    });

    const resultQueryRefreshToken = await queryRefreshToken.json();

    const { errors } = resultQueryRefreshToken;
    if (errors) {
      const error = errors[0].message;
      throw new Error(error);
    }

    if (resultQueryRefreshToken) {
      setToken(resultQueryRefreshToken.data.refreshToken.token);
      setRefreshToken(resultQueryRefreshToken.data.refreshToken.refreshToken);
      return;
    } else {
      setToken("");
      setRefreshToken("");
      setUser("");
      throw new Error("wasnt able to fetch new token!");
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserDetailsFunction = async (token, setUser) => {
  const getUserDetails = queryGetUserDetails();
  try {
    const queryGetUser = await fetch(graphQl_Uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(getUserDetails),
    });

    const resultUserDetails = await queryGetUser.json();
    const userDetails = resultUserDetails.data.getUserDetails;
    console.log("resultUserDetails from function:", userDetails);
    return userDetails;
  } catch (err) {
    console.log(err);
  }
};

const PrefetchFunction = async () => {
  const history = useHistory();

  const {
    token,
    refreshToken,
    setToken,
    setRefreshToken,
    setUser,
  } = useContext(UserContext);

  try {
    const checkIfUserIsValid = await fetch("http://localhost:3000/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const checkResult = await checkIfUserIsValid.json();

    if (!checkResult) {
      history.push(ROUTES.LOGIN);
      throw new Error("no status or message received from server");
    }

    if (checkIfUserIsValid.status === 200) {
      return true;
    } else {
      return await getRefreshToken(
        refreshToken,
        setToken,
        setRefreshToken,
        setUser
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export default PrefetchFunction;
