import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user";
import PrefetchFunction from "../hooks/usePrefetch";
import Header from "../components/Header";
import ShowAndSearchUser from "../components/showUser/ShowUser";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(UserContext);
  const checkPrefetch = PrefetchFunction().then((res) => setAuth(res));

  useEffect(() => {
    console.log("dashboard rendert");
  }, []);

  return (
    <div>
      <Header displayName="brewer" />
      {auth === true ? <ShowAndSearchUser /> : <p>Loading... </p>}
      <hr className="m-5"/>
      <p>Hello from Dashboard</p>
    </div>
  );
}
