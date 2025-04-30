import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Createform from "./Createform";
import Login from "./Login"; // Import the Login component

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    isAuthenticated,
    showUserLogin,
    setShowUserLogin,
    setIsModalOpen,
    isModalOpen,
    logout, // ✅ Access logout from context
  } = useAppContext();

  // Handle modal open for creating a job or showing login
  const handleModalOpen = () => {
    if (isAuthenticated) {
      setIsModalOpen(true); // Open create job modal
    } else {
      setShowUserLogin(true); // Open login modal
    }
  };

  const buttonClass =
    "bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 text-sm w-30";

  return (
    <div>
      <nav className="bg-white mx-auto mt-6 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex items-center justify-between p-4 rounded-full shadow-lg relative">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-gray-700 font-medium">
          <li className="hover:text-purple-600 cursor-pointer">Home</li>
          <li className="hover:text-purple-600 cursor-pointer">Find Jobs</li>
          <li className="hover:text-purple-600 cursor-pointer">Find Talents</li>
          <li className="hover:text-purple-600 cursor-pointer">About Us</li>
          <li className="hover:text-purple-600 cursor-pointer">Testimonials</li>
        </ul>

        {/* Conditional Button */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleModalOpen}
                className={`hidden md:block ${buttonClass}  cursor-pointer`}
              >
                Create Jobs
              </button>
              <button
                onClick={logout} // Call logout function from context
                className={`hidden ${buttonClass} `}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleModalOpen}
              className={`hidden md:block ${buttonClass} cursor-pointer`}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-md flex flex-col gap-4 p-4 md:hidden z-20">
            <li className="list-none hover:text-purple-600 cursor-pointer">
              Home
            </li>
            <li className="list-none hover:text-purple-600 cursor-pointer">
              Find Jobs
            </li>
            <li className="list-none hover:text-purple-600 cursor-pointer">
              Find Talents
            </li>
            <li className="list-none hover:text-purple-600 cursor-pointer">
              About Us
            </li>
            <li className="list-none hover:text-purple-600 cursor-pointer">
              Testimonials
            </li>
            <button onClick={handleModalOpen} className={buttonClass}>
              {isAuthenticated ? "Create Jobs" : "Login"}
            </button>
            {isAuthenticated && (
              <button onClick={logout} className={`hidden ${buttonClass}`}>
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Modal Components */}
      {isModalOpen && (
        <Createform
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {showUserLogin && <Login />}
    </div>
  );
}
