import React from "react";

import Button from "./Button";
import { Link } from "react-router-dom";
import "../App.css";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { userInfo, logoutUser } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-blue-600">
      <div className="container flex justify-between h-full ">
        <Link className="flex" to={"/"}>
          <h1 className="flex items-center text-2xl font-bold text-white ">
            TaskManager
          </h1>
        </Link>
        <div className="flex items-center ">
          <div className="box-border justify-end hidden gap-10 mr-6 md:flex font-700">
            <Link to="/">
              <li className="font-normal text-white list-none hover:text-blue-300 ">
                Home
              </li>
            </Link>
            {userInfo?.isLoggedIn && (
              <Link to="/tasks" className="">
                <li className="font-normal text-white list-none hover:text-blue-300">
                  Tasks
                </li>
              </Link>
            )}
          </div>
          {!userInfo?.isLoggedIn ? (
            <div className="">
              <Button
                className="inline !py-2 !px-4 ml-4 text-base !bg-white !text-blue-500"
                href="/login"
                title="Login"
              />
              <Button
                href="/signup"
                className="md:inline !py-2 !px-4 ml-4 text-bas hidden !bg-white !text-blue-500"
                title="Signup"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <Button
                className="flex !py-1 !px-4 ml-4 text-base !bg-white !text-blue-500"
                title="Logout"
                onClick={logoutUser}
              />
              <p className="flex items-center justify-center w-10 h-10 ml-6 text-xl font-bold text-blue-500 bg-white rounded-full min-w-10 min-h-10">
                {userInfo?.name?.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
