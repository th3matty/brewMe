import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignUp from "../pages/signup";
import { NOT_FOUND, SIGN_UP } from "../constants/routes";

export default function Login() {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const isInvalid = password === "" || emailAddress === "";

  const handleClick = (e) => {
    e.preventDefault();
    ValidateEmail(emailAddress);

    if (emailAddress && password) {
      console.log("email:", emailAddress, "password:", password);
    }
  };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailAddress
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    setError(true);
    return false;
  }

  useEffect(() => {
    document.title = "BrewMe - Login";
  }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          aria-label="enter your email adress"
          placeholder="Email adress"
          onChange={({ target }) => setEmailAdress(target.value)}
          value={emailAddress}
          onFocus={() => setEmailAdress("")}
        ></input>
        <input
          type="password"
          aria-label="enter your password"
          placeholder="your password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button
          disabled={isInvalid}
          onClick={handleClick}
          type="submit"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Login{" "}
        </button>
      </form>
      <p> Dont have an account?</p>
      <Link to={SIGN_UP}> Sign Up</Link>;
    </div>
  );
}
