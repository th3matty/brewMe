import React, { useState, useEffect, useContext } from "react";
import PrefetchFunction from "../hooks/usePrefetch";
import { UserContext } from "../context/user";
import ChooseAvatar from "../components/modal/ChooseAvatar";

import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { ReactComponent as HomeIcon } from "../svg/home.svg";
import { ReactComponent as EmailIcon } from "../svg/email.svg";
import { ReactComponent as EditIcon } from "../svg/editDescription.svg";
import { ReactComponent as CheckIcon } from "../svg/checkInput.svg";
import Background from "../dist/hopfenBG.jpg";

import { SetUserDescription } from "../services/graphQlMutation";

function Profile() {
  const [auth, setAuth] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openInputField, setOpenInputField] = useState(false);
  const [description, setDescription] = useState("");

  const avatar = "/default_user.png";

  const { user, token, setUser } = useContext(UserContext);
  const { followers, following, username, emailAddress } = user;

  const IMG_PATH = "/avatars/";

  const checkPrefetch = PrefetchFunction()
    .then((res) => setAuth(res))
    .catch((err) => console.log("err in porfile:", err));

  const displayModal = (argBool) => {
    setOpenAvatarModal(argBool);
  };

  const toggleInput = () => {
    setOpenInputField(!openInputField);
  };

  useEffect(() => {
    document.title = "BrewMe - Profile";
    console.log("user in profile", user);
  }, [user]);
  return (
    <>
      {auth === true ? (
        <main>
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${Background})`,
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-40 bg-black"
              ></span>
            </div>
          </section>
          <section className="relative py-32 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="rounded-full mt-2 w-24 h-auto align-middle border-none  cursor-pointer">
                        {user.settings.avatarURI !== "" ? (
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              IMG_PATH +
                              `${user.settings.avatarURI}`
                            }
                            alt="profilePic"
                            onClick={() => setOpenAvatarModal(true)}
                          />
                        ) : (
                          <img
                            src={
                              process.env.PUBLIC_URL + IMG_PATH + `${avatar}`
                            }
                            alt="profilePic"
                            onClick={() => setOpenAvatarModal(true)}
                          />
                        )}
                      </div>
                    </div>
                    {openAvatarModal ? (
                      <ChooseAvatar
                        displayModal={displayModal}
                        setUser={setUser}
                        token={token}
                      />
                    ) : null}
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center">
                      <div className="mt-24 sm:mt-0">
                        <Link to={ROUTES.DASHBOARD}>
                          <HomeIcon title="Dashboard" />
                        </Link>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {followers.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            Followers
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {following.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            Following
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      {username}
                    </h3>
                    <div className=" flex mb-2 justify-center text-gray-700">
                      <span>
                        <EmailIcon className="mr-2 w-6 h-6" />
                      </span>
                      {emailAddress}
                    </div>
                  </div>
                  <div className=" flex mb-2 justify-center text-gray-700 mt-10 border-t border-gray-300">
                    <span>
                      <EditIcon
                        className="mt-3 mr-2 w-6 h-6"
                        onClick={toggleInput}
                      />
                    </span>
                    {user.settings.description !== "" ? (
                      <p className="mt-3 mb-4 text-lg leading-relaxed text-gray-800">
                        {" "}
                        {user.settings.description}{" "}
                      </p>
                    ) : null}
                  </div>
                  {openInputField ? (
                    <div className="flex justify-center">
                      <input
                        type="text"
                        placeholder="something about you :)"
                        className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-m border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        onChange={({ target }) => setDescription(target.value)}
                      />
                      <span>
                        <CheckIcon
                          className="mt-1 ml-2 w-6 h-6"
                          onClick={() => {
                            SetUserDescription(description, token, setUser);
                            setOpenInputField(false);
                          }}
                        />
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <p> Loading... </p>
      )}
    </>
  );
}
export default Profile;
