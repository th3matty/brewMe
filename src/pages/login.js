import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress, password)
        .then((authUser) => {
          if (authUser.user.emailVerified) {
            history.push(ROUTES.DASHBOARD);
          } else {
            setError("please verify your email");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "BrewMe - Login";
  }, []);

  return (
    <div>
      {error && <p> {error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          aria-label="enter your email adress"
          placeholder="Your Email adress"
          onChange={({ target }) => setEmailAddress(target.value)}
          value={emailAddress}
          onFocus={() => setEmailAddress("")}
        ></input>
        <input
          type="password"
          aria-label="enter your password"
          placeholder="Your password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button
          disabled={isInvalid}
          type="submit"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Login{" "}
        </button>
      </form>
      <p> Dont have an account?</p>
      <Link to={ROUTES.SIGN_UP}> Sign Up</Link>;
    </div>
  );
}
