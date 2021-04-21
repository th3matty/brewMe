import React, { useState, createRef } from "react";
import { createPopper } from "@popperjs/core";
import { ReactComponent as AddToFavIcon } from "../../svg/AddToFav.svg";
import { ReactComponent as FollowIcon } from "../../svg/FollowUser.svg";

// imports for Testing
import DarthMaul from "../../dist/avatars/avatarDarthMaul.svg";

function RenderUser({ value }) {
  const { _id, username, avatarURI } = value;
  const [popoverShow, setPopoverShow] = useState(false);

  const btnRef = createRef();
  const popoverRef = createRef();

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
    <div key={_id} className="w-screen">
      {/* CardContainer */}
      <div className="rounded-full h-12 w-12 ml-2 mr-4 mt-4">
        {/* AVATAR */}
        <img
          title={username}
          alt={username}
          src={DarthMaul}
          onClick={() => {
            popoverShow ? closePopover() : openPopover();
          }}
          ref={btnRef}
        />
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
            <FollowIcon title="Follow Me" onClick={() => console.log(_id)} />
            <AddToFavIcon
              title="Add To Favourite"
              onClick={() => console.log(_id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderUser;
