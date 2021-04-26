import React, { useState, createRef, useEffect, useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ReactComponent as AddToFavIcon } from "../../svg/AddToFav.svg";
import { ReactComponent as FollowIcon } from "../../svg/FollowUser.svg";
import { FollowUser, AddUserToBuddies } from "../../services/graphQlMutation";
import { UserContext } from "../../context/user";

function RenderUser({ value }) {
  const { token } = useContext(UserContext);

  const { _id, username, avatarURI } = value;
  const [popoverShow, setPopoverShow] = useState(false);

  const btnRef = createRef();
  const popoverRef = createRef();

  const avatar = "/default_user.png";
  const IMG_PATH = "/avatars/";

  const [showMessage, setShowMessage] = useState("");

  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  useEffect(() => {
    console.log("unserName in RenderUser:", username);
  }, [username]);

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
          "bg-pink-600 border-0 ml-2 mt-2 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
        }
        ref={popoverRef}
      >
        <div>
          <div className="bg-blue-600 text-white opacity-90 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg">
            {username}
          </div>
          <div className=" flex space-x-5 text-white p-3 cursor-pointer">
            <FollowIcon
              title="Follow Me"
              onClick={() =>
                FollowUser(_id, token)
                  .then((res) => setShowMessage(res))
                  .catch((err) => console.log(err))
              }
            />
            <AddToFavIcon
              title="Add To Favourite"
              onClick={() => AddUserToBuddies(_id, token)}
            />
          </div>
          <div className="flex">
            <p className="m-2 underline text-sm text-left text-white">
              {" "}
              {showMessage}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderUser;
