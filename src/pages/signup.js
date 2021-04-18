import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { ReactComponent as BrewMeLogo } from "../svg/logo.svg";
import {
  graphQl_Uri,
  createUserMethodGraphQl,
} from "../services/graphQlQueries";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [helper, setHelpler] = useState("");
  const isInvalid = userName === "" || password === "" || emailAddress === "";

  // mongoDB method from services
  const userSignUp = createUserMethodGraphQl(
    userName,
    password,
    emailAddress,
    confirmPassword
  );

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const signUpUser = await fetch(graphQl_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignUp),
      });

      const createdUser = await signUpUser.json();

      const { errors } = createdUser;
      if (errors) {
        const error = errors[0].message;
        throw new Error(error);
      }
      const { createUser } = createdUser.data;
      if (createUser) {
        setHelpler(
          "Succesfully registrated. Please check your inbox for verifying your email \u{1F4A1}"
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "BrewMe - SignUp";
  }, []);

  return (
    <div className="container flex flex-col mx-auto max-w-screen-md items-center h-screen">
      {error && <p className="m-4 text-s text-red-500"> {error}</p>}
      {helper && <p className="m-4 text-s text-green-500">{helper}</p>}
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
          <input
            type="password"
            aria-label="confirm your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            placeholder="Please confirm your password"
            onChange={({ target }) => setConfirmPassword(target.value)}
            value={confirmPassword}
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
        <p className="text-m"> Already have an account?</p>
        <Link to={ROUTES.LOGIN}> Login In</Link>
      </div>
    </div>
  );
}
