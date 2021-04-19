import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
import { GetUserList } from "../../services/graphQlMutation";
import RenderUser from "./RenderUser";

function ShowRecentlyAddedUser({ count }) {
  const { token } = useContext(UserContext);
  const [displayUser, setDisplayUser] = useState();

  const userList = [
    { _id: 1, username: "Bob", avatarURI: "Batman" },
    { _id: 2, username: "Clara", avatarURI: "Robin" },
    { _id: 3, username: "Walz", avatarURI: "Superman" },
    { _id: 4, username: "Foo", avatarURI: "Aquaman" },
    { _id: 5, username: "Bar", avatarURI: "Supergirl" },
    { _id: 6, username: "Lupe", avatarURI: "Goblin" },
    { _id: 7, username: "Heinrich", avatarURI: "Invincible" },
    { _id: 8, username: "Uli", avatarURI: "Joker" },
    { _id: 9, username: "Matty", avatarURI: "Pinguin" },
    { _id: 10, username: "Tim", avatarURI: "TimsAHero" },
  ];

  useEffect(() => {
    GetUserList(count, token).then((res) => setDisplayUser(res));
  }, [count, token]);
  console.log("displayUser in CallForUserWidget:", displayUser);

  return (
    <div className="flex space-x-3">
      {userList.map((item) => (
        <RenderUser value={item} key={item._id}/>
      ))}
    </div>
  );
}

export default ShowRecentlyAddedUser;
