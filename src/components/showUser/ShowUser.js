import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";
import SearchSingleUser from "../modal/SearchUserModal";
import RecentlyAddedUser from "./RecentAddedUser";

function ShowAndSearchUser() {
  const [openSingleUserModal, setSingleUserModal] = useState(false);

  const displayModal = (argBool) => {
    setSingleUserModal(argBool);
  };

  return (
    <div className="container flex mx-auto">
      <div className="flex justify-start">
        <SearchIcon
          className="h-12 w-12 ml-1 mr-3 mt-7 cursor-pointer"
          title="Search"
          onClick={() => setSingleUserModal(true)}
        />
      </div>
      <div className="overflow-x-auto p-3">
        {" "}
        <RecentlyAddedUser count={20} />
      </div>
      {openSingleUserModal ? (
        <SearchSingleUser displayModal={displayModal} />
      ) : null}
    </div>
  );
}
export default ShowAndSearchUser;
