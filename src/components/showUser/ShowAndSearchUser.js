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
    <div className="flex md:flex-wrap md:justify-between">
      <div className="hidden md:visible lg:inline-block">
        <SearchIcon
          className="h-12 w-12 ml-1 mr-3 mt-4 cursor-pointer"
          title="Search"
          onClick={() => setSingleUserModal(true)}
        />
      </div>
      <div>
        <RecentlyAddedUser count={30} />
      </div>
      {openSingleUserModal ? (
        <SearchSingleUser displayModal={displayModal} />
      ) : null}
    </div>
  );
}
export default ShowAndSearchUser;
