import React, { useState } from "react";
import { SearchForSingleUser } from "../../services/graphQlMutation";
import RenderUser from "../showUser/RenderUser";

import { useContext } from "react";
import { UserContext } from "../../context/user";

function SearchUserModal({ displayModal }) {
  const { token } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const isInvalid = userName === "";

  const handleSearch = (e) => {
    e.preventDefault();

    SearchForSingleUser(userName, token)
      .then((res) => setSearchResult(res))
      .then(() => setUserName(""))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl ml-2 font-semibold">
                Search for other Brewer!
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => displayModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                placeholder="Search for user name?"
                className="px-4 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                value={userName}
                onFocus={() => setUserName("")}
                onChange={({ target }) =>
                  setUserName(target.value.toLowerCase())
                }
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`mt-2 bg-blue-500 text-white w-full rounded h-8 font-bold ${
                  isInvalid && "cursor-not-allowed opacity-50"
                }`}
                style={{ cursor: "pointer" }}
                onClick={handleSearch}
              >
                {" "}
                Search
              </button>
              {searchResult !== undefined ? (
                <RenderUser value={searchResult} className="ml-2" />
              ) : (
                <p className="ml-1 mt-3 text-s">
                  {" "}
                  woops, no user found {"\u274C"}{" "}
                </p>
              )}
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

export default SearchUserModal;
