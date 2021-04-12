import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user";
import PrefetchFunction from "../hooks/usePrefetch";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/sidebar";

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
      <p>Hello from Dashboard</p>
      {auth === true ? <Sidebar /> : <p>Loading... </p>}
    </div>
  );
}
