import React, { useEffect, useState } from "react";
import { artistAlbums } from "../utils/api"; // Ensure this function is correctly implemented
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylist = async () => {
    try {
      const playlistsResponse = await artistAlbums();
      const playlistsData = playlistsResponse.data.items.map((playlist) => ({
        name: playlist.name,
        description: playlist.description || "No description available", // Fallback for description
        image:
          playlist.images?.[0]?.url ||
          "https://cdn.getmidnight.com/b5a0b552ae89a91aa34705031852bd16/2022/08/1_1---2022-08-24T165236.013-1.png",
        totalTracks: playlist.tracks.total,
        idPlaylist: playlist.id,
        artists: playlist.artists || [], // Ensure artists is an array
      }));
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    // Featured Albums
    <div className="max-w-[1000px] overflow-hidden mx-auto mb-6">
      <h3 className="text-lg text-white mb-4">Artist Best</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 backdrop-blur-lg border border-[#ffffff1a] p-4 rounded-xl min-w-[180px] max-w-[180px] h-[260px] flex-shrink-0 shadow-lg"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-[120px] object-cover rounded-lg mb-3 shadow-md"
            />
            <h4 className="text-white font-semibold text-base mb-1 truncate max-w-sm">
              {playlist.name}
            </h4>
            <p className="text-gray-400 text-sm mb-1">
              {playlist.artists[0]?.name || "Various Artists"} {/* Fallback if no artist */}
            </p>
            <p className="text-gray-500 text-xs mb-3 truncate max-w-sm">
              {playlist.description} {/* Show playlist description */}
            </p>
            <div className="flex items-center space-x-3">
              <button className="text-white hover:text-red-400 transition-colors duration-200 text-xl">
                <CiHeart className="text-xl" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-xl">
                <MdOutlineFileDownload className="text-xl" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-xl">
                <BsThreeDotsVertical className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
