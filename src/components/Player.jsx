import React from "react";
import SpotifyPlayer from "react-spotify-player";

const Player = ({ className, trackUri}) => {
  const size = {
    width: "100%",
    height: 100,
  };
  const view = "list";
  const theme = "white";

  return (
    <div
      className={`flex items-center justify-center p-4 ${className} bg-violet-950 bg-opacity-30 backdrop-blur-md backdrop-brightness-110`}
    >
      <div className="w-full bg-transparent">
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
          <p className="text-white">Select a track to play.</p>
        )}
      </div>
    </div>
  );
};

export default Player;
