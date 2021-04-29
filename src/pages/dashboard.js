import React, { useEffect, useState } from "react";
import PrefetchFunction from "../hooks/usePrefetch";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
//import ShowAndSearchUser from "../components/showUser/ShowAndSearchUser";
import { ReactComponent as LoadingIcon } from "../svg/Ripple-1s-200px.svg";
import MainCointaner from "../components/MainCointaner";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const checkPrefetch = PrefetchFunction().then((res) => setAuth(res));

  useEffect(() => {
    console.log("dashboard rendert");
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Header />
        {auth === true ? (
          <MainCointaner />
        ) : (
          <div>
            <LoadingIcon /> <p className="text-center">...</p>
          </div>
        )}
      </div>
    </>
  );
}
