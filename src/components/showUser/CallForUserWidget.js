import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
import { GetUserList } from "../../services/graphQlMutation";
import RenderUser from "../showUser/RenderUser";

function ShowRecentlyAddedUser({ count }) {
  const { token } = useContext(UserContext);
  const [displayUser, setDisplayUser] = useState();

  const userList = [
    { id: 1, username: "Bob", avatarURI: "Batman" },
    { id: 2, username: "Clara", avatarURI: "Robin" },
    { id: 3, username: "Walz", avatarURI: "Superman" },
    { id: 4, username: "Foo", avatarURI: "Aquaman" },
    { id: 5, username: "Bar", avatarURI: "Supergirl" },
    { id: 6, username: "Lupe", avatarURI: "Goblin" },
    { id: 7, username: "Heinrich", avatarURI: "Invincible" },
    { id: 8, username: "Uli", avatarURI: "Joker" },
    { id: 9, username: "Matty", avatarURI: "Pinguin" },
    { id: 10, username: "Tim", avatarURI: "TimsAHero" },
  ];

  useEffect(() => {
    GetUserList(count, token).then((res) => setDisplayUser(res));
  }, [count, token]);
  console.log("displayUser in CallForUserWidget:", displayUser);

  return (
    <div className="flex space-x-3">
      {userList.map((item) => (
        <RenderUser value={item} />
      ))}
    </div>
  );
}

export default ShowRecentlyAddedUser;
