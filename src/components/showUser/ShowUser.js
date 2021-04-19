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
      <div className="">
        <SearchIcon
          className="h-10 w-10 mr-4 mt-4 cursor-pointer"
          title="Search"
          onClick={() => setSingleUserModal(true)}
        />
      </div>
      <div className="container overflow-x-auto p-3">
        {" "}
        <RecentlyAddedUser count={20}/>
      </div>
      {openSingleUserModal ? (
        <SearchSingleUser displayModal={displayModal} />
      ) : null}
    </div>
  );
}
export default ShowAndSearchUser;
