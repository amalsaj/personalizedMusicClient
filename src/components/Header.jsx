import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ({setSearch}) => {
  const handleSearchChange = (e) => {
    setSearch(true);
  };

  return (
    <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-2 px-4 bg-transparent">
      {/* Left section: Navigation links */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-gray-400 mb-2 md:mb-0">
        <a href="/discover" className="text-white hover:text-white transition">
          Discover
        </a>
        <a
          href="/popular"
          className="relative text-white after:block after:absolute after:h-[2px] after:bg-green-400 after:w-full after:bottom-[-4px]"
        >
          Popular
        </a>
        <a href="/latest" className="hover:text-white transition">
          Latest
        </a>
      </div>

      {/* Middle section: Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..." 
          onFocus={handleSearchChange}
          className="pl-3 pr-8 py-1 w-64 bg-[#2c2f33] text-gray-400 rounded-full focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-2 top-1.5 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 16l6-6m0 0l-6-6m6 6H3"
          />
        </svg>
      </div>

      {/* Right section: Icons and profile */}
      <div className="flex items-center space-x-3">
        <AiOutlineMessage className="h-5 w-5 text-gray-400 hover:text-white transition" />
        <IoIosNotificationsOutline className="h-5 w-5 text-gray-400 hover:text-white transition" />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7NSYeC_eZM9ZoAtWhrGB1mv4ePMLPfSJ4w&s"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
