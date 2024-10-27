import React from "react";
import { BiDownArrow } from "react-icons/bi";
import SpotifyPlayer from "react-spotify-player";

const FullPagePlayer = ({ trackUri, onClose }) => {
  const size = {
    width: "100%",
    height: "100%", // Full height
  };
  const view = "list";
  const theme = "white";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-full h-full">
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 text-white text-2xl bg-transparent border-0 cursor-pointer transition-transform transform hover:scale-105"
        >
          <BiDownArrow/>
        </button>
        {trackUri ? (
          <SpotifyPlayer 
            uri={trackUri} 
            size={size} 
            view={view} 
            theme={theme} 
            className="absolute inset-0 rounded-lg shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-center text-lg font-medium">
              Select a track to play
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPagePlayer;
