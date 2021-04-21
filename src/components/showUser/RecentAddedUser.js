import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
import { GetUserList } from "../../services/graphQlMutation";
import RenderUser from "./RenderUser";

function ShowRecentlyAddedUser({ count }) {
  const { token } = useContext(UserContext);
  const [displayUser, setDisplayUser] = useState();

  
  useEffect(() => {
    GetUserList(count, token).then((res) => setDisplayUser(res));
  }, [count, token]);

  return (

      <div className="flex space-x-3">
        {displayUser !== undefined ? (
        displayUser.map((item) => <RenderUser value={item} />)
      ) : (
        <h3>Loading profiles, just a second...</h3>
      )}
      </div>

  );
}

export default ShowRecentlyAddedUser;
