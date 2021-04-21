import React, { useState } from "react";
import { SetUserAvatar } from "../../services/graphQlMutation";

function ChooseAvatar({ displayModal, getAvatar, token , setUser}) {
  const IMG_PATH = "/avatars/";

  const avatarsList = [
    "/avatarBoyGlasses.svg",
    "/avatarCasualGuy.svg",
    "/avatarDarthMaul.svg",
    "/avatarDude.svg",
    "/avatarGirl.svg",
    "/avatarGoldenGirl.svg",
    "/avatarGranny.svg",
    "/avatarHipster.svg",
    "/avatarObi.svg",
    "/avatarOpa.svg",
    "/avatarPimp.svg",
    "/avatarRockStar.svg",
    "/avatarSeriousGuy.svg",
    "/avatarTeacher.svg",
  ];

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h4 className="text-3xl font-semibold">Set your Avatar!</h4>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => displayModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="flex flex-row flex-wrap space-x-2 p-2">
              {avatarsList.map((avatar) => (
                <img
                  key={avatar}
                  alt={avatar}
                  src={process.env.PUBLIC_URL + IMG_PATH + `${avatar}`}
                  className="w-24 h-24 cursor-pointer m-1"
                  onClick={() => {
                    getAvatar(avatar);
                    SetUserAvatar(avatar, token, setUser);
                  }}
                />
              ))}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => displayModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ChooseAvatar;
