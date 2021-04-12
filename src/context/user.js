import React, { useState, createContext } from "react";

export const UserContext = createContext({
  user: "",
  token: "",
  refreshToken: "",
  setUser: () => {},
  setToken: () => {},
  setRefreshToken: () => {},
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, refreshToken, setRefreshToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
