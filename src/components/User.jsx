import React, { useState } from 'react';

const User = ({ setSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    
    console.log('setSearch');
    setSearch(true);
  };




  return (
    <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      {/* Profile Image Positioned Top-Right */}
      <div className="absolute top-4 right-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7NSYeC_eZM9ZoAtWhrGB1mv4ePMLPfSJ4w&s"
          alt="Profile"
          className="rounded-full w-12 h-12 md:w-16 md:h-16 border-2 border-blue-600 shadow-lg cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-violet-900 text-white rounded-lg shadow-lg py-2 z-10">
            <a
              href="#account"
              className="block px-4 py-2 text-sm hover:bg-violet-700 transition-colors duration-150"
            >
              Account
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-sm hover:bg-violet-700 transition-colors duration-150"
            >
              Logout
            </a>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
        <div className="flex-grow">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Hello, John Johnson</h1>
          <h2 className="text-base md:text-lg font-normal text-gray-300 mb-4">Welcome back!</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search albums, songs..."
              className="w-full p-3 md:p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onFocus={handleClick}
            />
          </div>
          {/* <p className="text-sm text-gray-400">
            Find your favorite albums and songs easily.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default User;
