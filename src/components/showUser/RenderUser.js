import React, { useState, createRef, useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ReactComponent as AddToFavIcon } from "../../svg/AddToFav.svg";
import { ReactComponent as FollowIcon } from "../../svg/FollowUser.svg";
import { FollowUser, AddUserToBuddies } from "../../services/graphQlMutation";
import { UserContext } from "../../context/user";

function RenderUser({ value }) {
  const { token } = useContext(UserContext);

  const { _id, username, avatarURI } = value;
  const [popoverShow, setPopoverShow] = useState(false);

  const [message, setMessage] = useState("");
  const [successMessage, setSucces] = useState("");
  const [failMessage, setFail] = useState("");

  const btnRef = createRef();
  const popoverRef = createRef();

  const avatar = "/default_user.png";
  const IMG_PATH = "/avatars/";

  const clearState = () => {
    setMessage("");
    setSucces("");
    setFail("");
  };

  const handleFollowUser = () => {
    FollowUser(_id, token)
      .then((res) => {
        setMessage(res);

        if (res.startsWith("Success")) {
          setSucces("Following User!");
        } else {
          setFail("already in your list!");
        }
        return true;
      })
      .catch((err) => console.log(err));
    clearState();
  };

  const handleAddUserToBuddies = () => {
    AddUserToBuddies(_id, token)
      .then((res) => {
        setMessage(res);

        if (res.startsWith("Success")) {
          setSucces("Buddy added");
        } else {
          setFail("already in your list!");
        }
        return true;
      })
      .catch((err) => console.log(err));
    clearState();
  };

  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  return (
    <div key={_id}>
      {/* CardContainer */}
      <div className="rounded-full h-12 w-12 ml-2 mr-4 mt-4 cursor-pointer">
        {/* AVATAR */}
        {avatarURI !== "" ? (
          <img
            alt={username}
            title={username}
            ref={btnRef}
            onClick={() => {
              popoverShow ? closePopover() : openPopover();
            }}
            src={process.env.PUBLIC_URL + IMG_PATH + `${avatarURI}`}
          />
        ) : (
          <img
            alt={username}
            title={username}
            ref={btnRef}
            onClick={() => {
              popoverShow ? closePopover() : openPopover();
            }}
            src={process.env.PUBLIC_URL + IMG_PATH + `${avatar}`}
          />
        )}
      </div>
      {/* Button Container */}
      <div
        className={
          (popoverShow ? "" : "hidden ") +
          "bg-gray-400 border-0 ml-2 mt-2 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
        }
        ref={popoverRef}
      >
        <div>
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
          <div className="flex justify-around">
            <p className="m-1" title={successMessage}>
              {" "}
              {successMessage && <i className="fas fa-check"></i>}
            </p>
          </div>
          <div className="flex justify-around">
            <p className="m-1" title={failMessage}>
              {failMessage && <i className="fas fa-times-circle"></i>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderUser;
