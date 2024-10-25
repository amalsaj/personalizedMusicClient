import React, { useEffect, useState } from "react";
import { getFollow } from "../utils/api";

const Artist = () => {
  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState("");
  const [followers, setFollowers] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch artist data
  const fetchArtistData = async () => {
    try {
      const response = await getFollow(token);
      const artistInfo = response.data.artists.items[1];

      // Update state with artist information
      setArtistName(artistInfo.name);
      setFollowers(artistInfo.followers.total);
      setImage(artistInfo.images.length > 0 ? artistInfo.images[0].url : "");
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, []);

  return (
    <div className="relative p-4 rounded-lg mb-6 overflow-hidden shadow-lg bg-gradient-to-br from-[#1c1c3c] to-[#0f0f24]">
      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md opacity-30"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
      )}

      {/* Gradient overlay for a subtle effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-70"></div>

      <div className="flex items-center relative z-10">
        {/* Artist Image */}
        {image && (
          <img
            src={image}
            alt={artistName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#1ed760] shadow-lg"
          />
        )}

        <div className="ml-3 sm:ml-4">
          {/* Verified Artist Badge */}
          <div className="flex items-center mb-1">
            <span className="text-blue-400 text-xs sm:text-sm">Verified Artist</span>
            <svg
              className="w-4 h-4 text-blue-400 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 10l-7 7z" />
            </svg>
          </div>

          {/* Artist Name */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {artistName || "Unknown Artist"}
          </h3>

          {/* Followers Count */}
          <p className="text-gray-300 text-sm sm:text-base">
            {followers.toLocaleString()} monthly listeners
          </p>
        </div>
      </div>
    </div>
  );
};

export default Artist;
