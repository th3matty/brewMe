import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user";
import PrefetchFunction from "../hooks/usePrefetch";
import Header from "../components/Header";
import ShowAndSearchUser from "../components/showUser/ShowAndSearchUser";
import { ReactComponent as LoadingIcon} from "../svg/Ripple-1s-200px.svg"

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
      {auth === true ? (
        <ShowAndSearchUser />
      ) : (
        <div>
          <LoadingIcon /> <p className="text-center">Please login...</p>
        </div>
      )}
      <hr className="m-5" />
      <p>Hello from Dashboard</p>
    </div>
  );
}
