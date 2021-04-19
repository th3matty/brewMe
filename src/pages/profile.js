import React, { useState, useEffect, useContext } from "react";
import PrefetchFunction from "../hooks/usePrefetch";
import { UserContext } from "../context/user";

import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { ReactComponent as HomeIcon } from "../svg/home.svg";
import { ReactComponent as EmailIcon } from "../svg/email.svg";
import Background from "../dist/hopfenBG.jpg";

function Profile() {
  const [auth, setAuth] = useState(false);

  const { user } = useContext(UserContext);
  const { followers, following, username, emailAddress } = user;

  const avatarsList = [
      "/boy_default.png",
      "/avatarBoyGlasses.svg"
  ];
  const IMG_PATH = '/avatars/'

  const checkPrefetch = PrefetchFunction()
    .then((res) => setAuth(res))
    .catch((err) => console.log("err in porfile:", err));

  useEffect(() => {
    document.title = "BrewMe - Profile";
    console.log("Profile rendert");
  }, []);
  return (
    <>
      {/* Dashboard */}
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
              >
                <div className="cursor-pointer">
                  <Link to={ROUTES.DASHBOARD}>
                    <HomeIcon
                      className="mt-4 mr-3 stroke-white"
                      title="Dashboard"
                    />
                  </Link>
                </div>
              </span>
            </div>
          </section>
          <section className="relative py-32 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative rounded-full mt-2 w-24 h-auto align-middle border-none absolute">
                        <img alt="imageUser" src={process.env.PUBLIC_URL + IMG_PATH +`${avatarsList[1]}`} />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Settings
                        </button>
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
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          A little bit about yourself or the gear you are using
                        </p>
                      </div>
                    </div>
                  </div>
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
