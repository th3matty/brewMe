import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user";
import { FollowUser, AddUserToBuddies } from "../../services/graphQlMutation";
import { ReactComponent as AddToFavIcon } from "../../svg/AddToFav.svg";
import { ReactComponent as FollowIcon } from "../../svg/FollowUser.svg";

function PopOver({ value }) {
  const { token } = useContext(UserContext);
  const { _id, username } = value;

  const [successMessage, setSucces] = useState("");
  const [failMessage, setFail] = useState("");

  const handleFollowUser = async () => {
    try {
      const followUser = await FollowUser(_id, token);
      const responseFollowUser = await followUser.toString();

      if (responseFollowUser.startsWith("Success")) {
        setSucces("Following");
      } else {
        setFail("already added!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUserToBuddies = async () => {
    try {
      const addBuddy = await AddUserToBuddies(_id, token);
      const responseAddBuddy = await addBuddy.toString();

      if (responseAddBuddy.startsWith("Success")) {
        setSucces("Buddy added");
      } else {
        setFail("already added!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-400 border-0 ml-2 mt-2 block z-1 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
      <div className="bg-blue-500 text-white opacity-90 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg">
        {username}
      </div>
      <div className=" flex justify-around space-x-4 text-white p-3 cursor-pointer">
        <FollowIcon title="Follow Me" onClick={handleFollowUser} />
        <AddToFavIcon
          title="Add To Favourite"
          onClick={handleAddUserToBuddies}
        />
      </div>
      <div className="flex justify-around text-sm max-w-xs overflow-ellipsis overflow-hidden">
        <p className="m-1" title={successMessage}>
          {" "}
          {successMessage && <i className="fas fa-check"> Done!</i>}
        </p>
      </div>
      <div className="flex justify-around">
        <p className="m-1" title={failMessage}>
          {failMessage && <i className="fas fa-times-circle">{failMessage}</i>}
        </p>
      </div>
    </div>
  );
}

export default PopOver;
