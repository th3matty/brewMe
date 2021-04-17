import React from "react";

// imports for Testing
import boyglasses from "../../dist/avatars/avatarBoyGlasses.svg";
import casualGuy from "../../dist/avatars/avatarCasualGuy.svg";
import DarthMaul from "../../dist/avatars/avatarDarthMaul.svg";
import defaultUser from "../../dist/avatars/default_user.png";

function RenderUser({ value }) {
  const { id, username, avatarURI } = value;
  console.log(id, username, avatarURI);

  return (
    <div key={id} className="w-screen">
      {/* CardContainer */}
      <div className="rounded-full h-12 w-12 mr-4 mt-4">
        {/* AVATAR */}
        <img
          title={username}
          alt={username}
          src={DarthMaul}
        />
      </div>
      {/* Button Container */}
      {/* <div>
        <button> Follow </button>
        <button> Add To Favourite </button>
      </div> */}
    </div>
  );
}

export default RenderUser;
