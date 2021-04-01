import React from "react";
import useUser from "../../hooks/use-user";


export default function Sidebar() {
  const { user = {}} = useUser();
 
  const { docId, userId, following, username } = user
  //console.log(docId, userId, following, username )
  return <p>I am the sidebar</p>;
}
