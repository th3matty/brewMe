import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {ReactComponent as BrewMeLogo} from "../svg/logo.svg"
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b mb-8">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard" >
             <BrewMeLogo alt="BrewMe"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
