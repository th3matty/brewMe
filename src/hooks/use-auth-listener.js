import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        console.log("hello from use-authListener, because you logged in and used firebase from firebaseContext in UseEffect");
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        console.log("oh you have removed the auth from local storage, because you called fireabaseContext in UseEffect");
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);

  return {user}
}
