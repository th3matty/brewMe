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
    <div className="container flex flex-col mx-auto max-w-screen-md items-center h-screen">
      {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
      <div className="flex  items-center bg-white p-4 border mb-4">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            aria-label="enter your email adress"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your Email adress"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
            onFocus={() => setEmailAddress("")}
          ></input>
          <input
            type="password"
            aria-label="enter your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Your password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col  bg-white p-4 border">
        <p className="text-sm"> Dont have an account?</p>
        <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
      </div>
    </div>
  );
}
