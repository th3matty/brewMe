import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

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
        // redirect
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
    <div>
      {error && <p> {error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          aria-label="enter your User Name"
          placeholder=" Your User Name"
          onChange={({ target }) => setUserName(target.value.toLowerCase())}
          value={userName}
        />
        <input
          type="text"
          aria-label="enter your email adress"
          placeholder="Your Email adress"
          onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
          onFocus={() => setEmailAddress("")}
          value={emailAddress}
        />
        <input
          type="password"
          aria-label="enter your password"
          placeholder="Your password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <button
          disabled={isInvalid}
          type="submit"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Sign Up{" "}
        </button>
      </form>
      <div>
        <p> Have an account?</p>
        <Link to={ROUTES.LOGIN}> Login In</Link>;
      </div>
    </div>
  );
}
