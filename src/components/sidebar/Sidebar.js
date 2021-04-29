import React, { useState, useEffect } from "react";
import PrefetchFunction from "../../hooks/usePrefetch";
import {
  Link,
  Switch,
  Route,
  withRouter,
  useRouteMatch,
} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SearchSingleUser from "../modal/SearchUserModal";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";
import CreateRecipe from "../../pages/createRecipe";

function CalltoActionWidgetContainer({ setSingleUserModal, ...props }) {
  let { match } = props;
  let { path, url } = useRouteMatch();

  useEffect(() => {
    console.log("props in Call TO Action - SIDEBAR:", props);
  });
  return (
    <>
      <div className="mt-6 mb-5 lg:hidden">
        <SearchIcon
          className="h-10 w-10 cursor-pointer"
          title="Search"
          onClick={() => setSingleUserModal(true)}
        />
      </div>
      {/* (show in dashboard?) */}
      <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4 overflow-x-hidden">
        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/"
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Bier Kombinat
          </Link>
        </li>

        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/"
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Recipes
          </Link>
        </li>

        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/createrecipe"
            //to={ROUTES.CREATERECIPE}
            //to={`${match.url}/createrecipe`}
            //to={`${url}/createrecipe`}
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Create Recipes
          </Link>
        </li>
        {/* (show in dashboard?) */}
        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/"
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Followers
          </Link>
        </li>

        {/* (show in dashboard?) */}
        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to={"/"}
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Following
          </Link>
        </li>

        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/"
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Darkmode (soon)
          </Link>
        </li>

        <li className="inline-flex">
          <Link
            className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
            to="/"
          >
            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
            Notification (soon)
          </Link>
        </li>
      </ul>

      {/* <Switch>
        <Route
          // path={`${match.url}/createrecipe`}
          path={`${path}/createRecipe`}
          component={CreateRecipe}
        >
          <CreateRecipe />
        </Route>
      </Switch> */}
    </>
  );
}

const CalltoActionWidget = withRouter(CalltoActionWidgetContainer);

function SidebarContainer(props) {
  const { match } = props;

  const [collapseShow, setCollapseShow] = useState("hidden");
  const [openSingleUserModal, setSingleUserModal] = useState(false);

  const [auth, setAuth] = useState(false);
  const checkPrefetch = PrefetchFunction().then((res) => setAuth(res));

  const displayModal = (argBool) => {
    setSingleUserModal(argBool);
  };

  useEffect(() => {
    console.log("props in Sidebar:", props);
  });

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        {/* Toggler */}
        <button
          type="button"
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-50 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200 ">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <div className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                  BrewMe
                </div>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                to={ROUTES.DASHBOARD}
                aria-label="Dashboard"
                className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Dashboard
              </Link>
            </li>
          </ul>
          <hr className="my-3 md:min-w-full" />

          {/* user authenticated?, show options or null */}
          {/* {auth ? (
            <CalltoActionWidget setSingleUserModal={setSingleUserModal} />
          ) : null} */}

          {/* test */}
          <li className="inline-flex">
            <Link
              className="text-blueGray-700 hover:text-blueGray-500  text-sm block mb-4 no-underline font-semibold"
              to={match.url + "createrecipe"}
              //to={`${match.url}/createrecipe`}
            >
              <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i>{" "}
              Create Recipes
            </Link>
          </li>

          <Switch>
            <Route path={match.url + "createrecipe"} component={CreateRecipe} />
          </Switch>

          {/* test - end */}

          {/* Modal for SingleUserSearch */}
          {openSingleUserModal ? (
            <SearchSingleUser displayModal={displayModal} />
          ) : null}
        </div>
      </nav>
    </>
  );
}

const Sidebar = withRouter(SidebarContainer);

export default Sidebar;
