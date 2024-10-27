import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-player";
import FullPagePlayer from "./FullPagePlayer"; // Adjust the import path accordingly

const Player = ({ className, trackUri }) => {
  const [isFullPage, setIsFullPage] = useState(false);

  const handleTrackClick = () => {
    if (trackUri) {
      setIsFullPage(true);
    }
  };

  const closeFullPage = () => {
    setIsFullPage(false);
  };

  const size = {
    width: "100%",
    height: 80, // Height for compact design
  };
  const view = "list";
  const theme = "white";

  return (
    <>
      <div
        className={`flex items-center justify-center p-2 ${className} bg-violet-950 bg-opacity-40 backdrop-blur-md rounded-md shadow-md transition-all duration-300 mb-8 md:mb-0`} 
        onClick={handleTrackClick} // Handle track click to open full player
      >
        <div className="w-full bg-transparent rounded-md overflow-hidden">
          {trackUri ? (
            <div className="relative">
              <SpotifyPlayer 
                uri={trackUri} 
                size={size} 
                view={view} 
                theme={theme} 
                className="absolute inset-0" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-center text-sm font-medium">
                Select a track to play
              </p>
            </div>
          )}
        </div>
      </div>
      {isFullPage && (
        <FullPagePlayer trackUri={trackUri} onClose={closeFullPage} />
      )}
    </>
  );
};

export default Player;
