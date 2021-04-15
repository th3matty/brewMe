import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";
import SearchSingleUser from "../modal/SearchUserModal";

function Sidebar() {
  const [openSingleUserModal, setSingleUserModal] = useState(false);

  const displayModal = (argBool) => {
    setSingleUserModal(argBool);
  };

  return (
    <div className="md:container md:mx-auto flex">
      <div className="">
        <SearchIcon
          className="mr-3 cursor-pointer"
          title="Search"
          onClick={() => setSingleUserModal(true)}
        />
      </div>
      {/* new component for showing user*/}
      <div className=""> alle user </div>
      {openSingleUserModal ? (
        <SearchSingleUser displayModal={displayModal} />
      ) : null}
    </div>
  );
}
export default Sidebar;
