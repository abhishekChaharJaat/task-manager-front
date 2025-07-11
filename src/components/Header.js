import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Button from "./Button";
import "../App.css";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { userInfo, logoutUser, setShowSignup, setShowLogin } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeDropdown();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 h-16">
        <Link to="/" className="text-white text-2xl font-bold">
          TaskManager
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-white font-medium items-center">
          <NavLink to="/" onClick={closeMenu}>
            <li className="hover:text-blue-300 transition-colors">Home</li>
          </NavLink>
          {userInfo?.isLoggedIn && (
            <NavLink to="/tasks" onClick={closeMenu}>
              <li className="hover:text-blue-300 transition-colors">Tasks</li>
            </NavLink>
          )}
        </ul>

        {/* Auth Buttons or User Dropdown */}
        <div className="hidden md:flex items-center relative">
          {!userInfo?.isLoggedIn ? (
            <>
              <Button
                className="!py-2 !px-4 text-base !bg-white !text-blue-500"
                title="Login"
                onClick={() => setShowLogin(true)}
              />
              <Button
                className="ml-3 !py-2 !px-4 text-base !bg-white !text-blue-500"
                title="Signup"
                onClick={() => setShowSignup(true)}
              />
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Just icon button to toggle dropdown */}
              <button
                className="ml-4 text-slate-500 font-bold rounded-full flex items-center justify-center focus:outline-none"
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                <FaUserCircle
                  size={40}
                  className="text-white border-2 rounded-full border-blue-950"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-sm border-b flex items-center space-x-2">
                    <FaUserCircle />
                    <span>{userInfo?.name || userInfo?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4 space-y-4">
          <NavLink to="/" onClick={closeMenu}>
            <div className="text-white text-lg hover:text-blue-300">Home</div>
          </NavLink>
          {userInfo?.isLoggedIn && (
            <NavLink to="/tasks" onClick={closeMenu}>
              <div className="text-white text-lg hover:text-blue-300">
                Tasks
              </div>
            </NavLink>
          )}
          {!userInfo?.isLoggedIn ? (
            <div className="flex gap-4 flex-col">
              <Button
                onClick={() => {
                  setShowLogin(true);
                  closeMenu();
                }}
                className="text-white text-lg hover:text-blue-300"
                title="Login"
              />
              <Button
                onClick={() => {
                  setShowSignup(true);
                  closeMenu();
                }}
                className="text-white text-lg hover:text-blue-300"
                title="Signup"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <FaUserCircle size={24} />
                <span>{userInfo?.name || userInfo?.email}</span>
              </div>
              <Button
                onClick={() => {
                  logoutUser();
                  closeMenu();
                }}
                className="text-white text-lg hover:text-blue-300 flex items-center space-x-2"
                title={
                  <>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </>
                }
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
