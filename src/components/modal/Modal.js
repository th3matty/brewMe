import React, { useState, useEffect } from "react";
import SearchForUser from "../../hooks/useSearchUser";
import { useContext } from "react";
import { UserContext } from "../../context/user";

function Modal({ displayModal }) {
  const [userName, setUserName] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const { token } = useContext(UserContext);

  const fetchUser = (userName, token) =>
    SearchForUser(userName, token)
      .then((res) => setSearchResult(res))
      .catch((err) => console.log(err));

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUser(userName, token);
  };

  useEffect(() => {
    console.log("searchResult in Modal:", searchResult);
  }, [searchResult]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
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
                placeholder="Search for username?"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                onChange={({ target }) => setUserName(target.value)}
              />
              <button
                className="text-blue-500 background-transparent font-bold uppercase mt-4 ml-1 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                onClick={handleSearch}
              >
                {" "}
                Search
              </button>
              <div>{searchResult}</div>
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

export default Modal;
