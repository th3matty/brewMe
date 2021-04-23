import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
import { GetUserList } from "../../services/graphQlMutation";
import RenderUser from "./RenderUser";

import { ReactComponent as LoadingIcon } from "../../svg/Ripple-1s-200px.svg";

function ShowRecentlyAddedUser({ count }) {
  const { token } = useContext(UserContext);
  const [displayUser, setDisplayUser] = useState([]);

  useEffect(() => {
   GetUserList(count, token).then((res) => setDisplayUser(res));
  }, [count, token]);

  return (
    <div className="flex flex-wrap lg:space-x-16">
      {displayUser !== undefined ? (
        displayUser.map((item) => <RenderUser value={item} />)
      ) : (
        <div>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default ShowRecentlyAddedUser;
