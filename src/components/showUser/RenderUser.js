import React, { useState, createRef } from "react";
import { createPopper } from "@popperjs/core";

import PopOver from "./PopOver";

function RenderUser({ value }) {
  const { _id, username, avatarURI } = value;
  const [popoverShow, setPopoverShow] = useState(false);

  const btnRef = createRef();
  const popoverRef = createRef();

  const avatar = "/default_user.png";
  const IMG_PATH = "/avatars/";


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
      {/* PopOver Container */}
      <div ref={popoverRef}>
        {popoverShow ? <PopOver value={value} /> : null}
      </div>
    </div>
  );
}

export default RenderUser;
