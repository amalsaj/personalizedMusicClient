import React from "react";
import { AiFillHome } from "react-icons/ai"; // Home icon
import { BiSearch } from "react-icons/bi"; // Search icon
import { FaBroadcastTower } from "react-icons/fa"; // Radio icon
import { MdLibraryMusic } from "react-icons/md"; // Your Library icon
import { IoMdAlbums } from "react-icons/io"; // Browse icon
import { useLocation } from "react-router-dom"; // Import useLocation for routing

const BottomNav = () => {
  const location = useLocation(); // Get current location

  const navItems = [
    { name: "Home", icon: <AiFillHome size={24} />, path: "/profile" },
    { name: "Browse", icon: <IoMdAlbums size={24} />, path: "/browse" },
    { name: "Search", icon: <BiSearch size={24} />, path: "/search" },
    { name: "Radio", icon: <FaBroadcastTower size={24} />, path: "/radio" },
    { name: "Your Library", icon: <MdLibraryMusic size={24} />, path: "/library" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#2d223b] border-t border-gray-700 flex justify-around items-center py-2">
      {navItems.map((item) => (
        <div key={item.name} className="flex flex-col items-center">
          <a href={item.path} aria-label={item.name} className={`flex flex-col items-center ${location.pathname === item.path ? "text-green-500" : "text-white"}`}>
            {item.icon}
          </a>
          <span className={`text-xs ${location.pathname === item.path ? "text-green-500" : "text-white"}`}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
