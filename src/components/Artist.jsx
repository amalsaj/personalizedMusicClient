import React, { useEffect, useState } from "react";
import { getFollow } from "../utils/api";

const Artist = () => {
  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState("");
  const [followers, setFollowers] = useState(0);
  const token = localStorage.getItem("token");

  const fetchArtistData = async () => {
    try {
      const response = await getFollow(token);
      const artistInfo = response.data.artists.items[1];
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
    <div className="relative p-3 rounded-md shadow-lg bg-gradient-to-br mt-4 from-[#1c1c3c] to-[#0f0f24]">
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-25"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-60"></div>

      <div className="flex items-center relative z-10">
        {image && (
          <img
            src={image}
            alt={artistName}
            className="w-16 h-16 rounded-full border-2 border-[#1ed760] shadow-md"
          />
        )}

        <div className="ml-3">
          <div className="flex items-center text-xs text-blue-400 mb-0.5">
            Verified Artist
            <svg className="w-3.5 h-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 10l-7 7z" />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-white">{artistName || "Unknown Artist"}</h3>
          <p className="text-gray-300 text-xs">{followers.toLocaleString()} monthly listeners</p>
        </div>
      </div>
    </div>
  );
};

export default Artist;
