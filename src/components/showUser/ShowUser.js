import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";
import SearchModal from "../modal/Modal";
import { getUserList } from "../../services/graphQlQueries";

function Sidebar() {
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user, token } = useContext(UserContext);

  const displayModal = (argBool) => {
    setShowModal(argBool);
  };

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  return (
    <div className="md:container md:mx-auto flex">
      <div className="">
        <SearchIcon
          className="mr-3 cursor-pointer"
          title="Search"
          onClick={() => setShowModal(true)}
        />
      </div>
      {/* new component for showing user*/}
      <div className=""> alle user </div>
      {showModal ? (
        <SearchModal
          displayModal={displayModal}
        />
      ) : null}
    </div>
  );
}
export default Sidebar;

// eine kleine lupe als svg zum Suchen. => öffnet ein modal oder tooltip/suchleiste mit einem onchange => gibt bei Erfolg DEN User aus

// in dieser Component möchte ich randomly user angezeigt bekommen " suggested user"

// wenn user auf die Lupe klickt werden "suggested user" ausgeblendet
// und dafür das ergebniss der Suche angezeigt ( success: $userName )
// meta daten UserID für weitere aktionen wie "follow User" oder "addUserToFavourites"
// ( fail : could not find this $userName)

// jeder user hat ein onClick events
// onClick => öffnet Modal ( userDetail : username, follow button, unfollow , addUserToFavourites )

// write function for query UsersList
// use function in Component UserList
// use funciton with argument (value from search field) in Modal / searchbar
