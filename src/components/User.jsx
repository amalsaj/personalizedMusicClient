import React, { useState, useEffect } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';

const User = ({ userName = "John Johnson", setSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black text-gray-100 p-6 rounded-b-lg shadow-md max-w-full mx-auto">
      {/* App Header */}
      <div className="flex items-center justify-between">
        {/* Greeting Section */}
        <div>
          <h1 className="text-xl font-semibold">{greeting},</h1>
          <h2 className="text-lg font-light text-gray-300">{userName}!</h2>
        </div>

        {/* Profile Image & Dropdown */}
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7NSYeC_eZM9ZoAtWhrGB1mv4ePMLPfSJ4w&s"
            alt="Profile"
            className="rounded-full w-12 h-12 border-2 border-gray-600 shadow-lg cursor-pointer transform transition-transform duration-150 hover:scale-105"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 rounded-lg shadow-lg py-2 z-20">
              <a
                href="#account"
                className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors duration-150"
              >
                <FiUser className="mr-2" /> Account
              </a>
              <a
                href="/"
                className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors duration-150"
              >
                <FiLogOut className="mr-2" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-gray-400 mt-4 text-sm">Welcome back! Let’s get started with your tasks for today.</p>
    </div>
  );
};

export default User;
