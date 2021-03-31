import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = userName === "" || password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userExist = doesUsernameExist(userName);

    if (!userExist.length) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUser.user.sendEmailVerification();

        console.log("createdUser:", createdUser);

        await createdUser.user.updateProfile({
          displayName: userName,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUser.user.uid,
          username: userName.toLowerCase(),
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.LOGIN);
      } catch (error) {
        setUserName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUserName("");
      setEmailAddress("");
      setPassword("");
      setError("username is already taken, please try another!");
    }
  };

  useEffect(() => {
    document.title = "BrewMe - SignUp";
  }, []);

  return (
    <div className="container flex flex-col mx-auto max-w-screen-md items-center h-screen">
      {error && <p className="mb-4 mt-4 text-xs text-red-500"> {error}</p>}
      <BrewMeLogo />
      <div className="flex items-center bg-white p-4 border mb-4 mt-4">
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            aria-label="enter your User Name"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder=" Your User Name"
            onChange={({ target }) => setUserName(target.value.toLowerCase())}
            value={userName}
          />
          <input
            type="text"
            aria-label="enter your email adress"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your Email adress"
            onChange={({ target }) =>
              setEmailAddress(target.value.toLowerCase())
            }
            onFocus={() => setEmailAddress("")}
            value={emailAddress}
          />
          <input
            type="password"
            aria-label="enter your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Sign Up{" "}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col  bg-white p-4 border">
        <p className="text-m"> Have an account?</p>
        <Link to={ROUTES.LOGIN}> Login In</Link>
      </div>
    </div>
  );
}
