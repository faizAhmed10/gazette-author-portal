import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthorContext from "../utils/assets/AuthorContext";
import ConfirmPopup from "./ConfirmPopup";
import ScrollDirection from "./ScrollDirection";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger

const Navbar = () => {
  let { logout } = useContext(AuthorContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state to control the menu
  const scrollDirection = ScrollDirection();

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  return (
    <nav
      className={`flex items-center bg-black text-white px-2 py-4 lg:py-2 lg:px-10 shadow-2xl w-full z-10 transition-transform duration-300 ease-in-out ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <ConfirmPopup
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to Logout?"
      />

      <Link
        to="/"
        className="lg:text-4xl flex-1 md:flex-1 text-3xl select-none"
      >
        HKBK Gazette
      </Link>
  
      {/* Hamburger Icon (visible on mobile) */}
      <div className="lg:hidden flex">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menu items */}
      <ul
        className={`fixed z-50 top-0 left-0 h-[100dvh] w-1/3 bg-black text-white p-5 flex flex-col gap-6 items-center transform transition-transform duration-300 lg:static lg:flex-row lg:h-auto lg:w-auto lg:p-0 lg:bg-transparent lg:gap-10 lg:flex lg:items-center  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <li className="relative">
          <NavLink
            to="/create"
            className="ho-ef"
            activeclassname="active"
            onClick={() => setIsMenuOpen(false)} // Close the menu on link click
          >
            Create
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            to="/dashboard"
            className="ho-ef"
            activeclassname="active"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false); // Close the menu on logout
            }}
            className="p-2 rounded my-2 bg-white text-black"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
