import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PrefetchFunction from "../hooks/usePrefetch";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
import Main from "../components/Main";
import { ReactComponent as LoadingIcon } from "../svg/Ripple-1s-200px.svg";

function DashboardContainer(props) {
  const [auth, setAuth] = useState(false);
  const checkPrefetch = PrefetchFunction().then((res) => setAuth(res));

  useEffect(() => {
    console.log("dashboard rendert");
    console.log("props aus dashboard:", props);
  });

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Header />
        {auth === true ? (
          <Main />
        ) : (
          <div>
            <LoadingIcon /> <p className="text-center">...</p>
          </div>
        )}
      </div>
    </>
  );
}

const Dashboard = withRouter(DashboardContainer);
export default Dashboard;
