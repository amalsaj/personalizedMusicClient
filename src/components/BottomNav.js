import React from "react";
import { AiFillHome } from "react-icons/ai"; // Home icon
import { BiSearch } from "react-icons/bi"; // Search icon
import { FaBroadcastTower } from "react-icons/fa"; // Radio icon
import { MdLibraryMusic } from "react-icons/md"; // Your Library icon
import { IoMdAlbums } from "react-icons/io"; // Browse icon

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#2d223b] border-t border-gray-700 flex justify-around items-center py-2">
      <div className="flex flex-col items-center">
        <AiFillHome size={24} className="text-white" />
        <span className="text-xs text-white">Home</span>
      </div>
      <div className="flex flex-col items-center">
        <IoMdAlbums size={24} className="text-green-500" />
        <span className="text-xs text-white">Browse</span>
      </div>
      <div className="flex flex-col items-center">
        <BiSearch size={24} className="text-white" />
        <span className="text-xs text-white">Search</span>
      </div>
      <div className="flex flex-col items-center">
        <FaBroadcastTower size={24} className="text-white" />
        <span className="text-xs text-white">Radio</span>
      </div>
      <div className="flex flex-col items-center">
        <MdLibraryMusic size={24} className="text-white" />
        <span className="text-xs text-white">Your Library</span>
      </div>
    </div>
  );
};

export default BottomNav;
