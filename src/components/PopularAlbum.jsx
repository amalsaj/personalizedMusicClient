import React, { useEffect, useState } from "react";
import { popularAlbums } from "../utils/api"; // Ensure this function is correctly implemented
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PopularAlbums = ({ setTrackUri, setValue, setApiType }) => {
  const [albums, setAlbums] = useState([]); // Renamed to albums for clarity

  const token = localStorage.getItem("token");

  const handlePlaylist = (id) => {
    localStorage.setItem("id", id);
    setValue(true);
    setApiType("playlist");
  };

  const fetchPopularAlbums = async () => {
    try {
      const newPopularAlbums = await popularAlbums(token);
      const playlists = newPopularAlbums.data.playlists.items.map(
        (playlist) => ({
          name: playlist.name,
          image: playlist.images[0]?.url,
          total: playlist.tracks.total,
          artists: playlist.artists || [],
          trackUri: playlist.uri,
          id: playlist.id,
        })
      );
      setAlbums(playlists);
    } catch (error) {
      console.error("Error fetching popular albums:", error);
    }
  };

  useEffect(() => {
    fetchPopularAlbums();
  }, []);

  return (
    // Featured Albums
    <div className="max-w-[1000px] overflow-hidden mx-auto mb-6">
      <h3 className="text-lg text-white mb-4">Popular Albums</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 backdrop-blur-lg border border-[#ffffff1a] p-4 rounded-xl min-w-[160px] max-w-[160px] h-[240px] flex-shrink-0 shadow-lg
            sm:min-w-[180px] sm:max-w-[180px] sm:h-[260px]" // Compact on small screens
          >
            <img
              src={album.image}
              alt={album.name}
              className="w-full h-[100px] sm:h-[120px] object-cover rounded-lg mb-2 shadow-md" // Reduced height on small screens
              onClick={() => handlePlaylist(album.id)}
            />
            <h4 className="text-white font-semibold text-sm sm:text-base mb-1 truncate max-w-sm">
              {album.name}
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              {album.artists[0]?.name || "Various Artists"}{" "}
              {/* Handle undefined artists */}
            </p>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="text-white hover:text-red-400 transition-colors duration-200 text-lg sm:text-xl">
                <CiHeart />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-lg sm:text-xl">
                <MdOutlineFileDownload />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-lg sm:text-xl">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAlbums;
