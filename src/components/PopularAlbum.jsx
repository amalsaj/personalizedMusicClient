import React, { useEffect, useState } from "react";
import { popularAlbums } from "../utils/api";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const PopularAlbums = ({ setTrackUri, setValue, setApiType }) => {
  const [albums, setAlbums] = useState([]);
  const token = localStorage.getItem("token");

  const handlePlaylist = (id) => {
    localStorage.setItem("id", id);
    setValue(true);
    setApiType("playlist");
  };

  const fetchPopularAlbums = async () => {
    try {
      const newPopularAlbums = await popularAlbums(token);
      const playlists = newPopularAlbums.data.playlists.items.map((playlist) => ({
        name: playlist.name,
        image: playlist.images[0]?.url,
        total: playlist.tracks.total,
        artists: playlist.artists || [],
        trackUri: playlist.uri,
        id: playlist.id,
      }));
      setAlbums(playlists);
    } catch (error) {
      console.error("Error fetching popular albums:", error);
    }
  };

  useEffect(() => {
    fetchPopularAlbums();
  }, []);

  return (
    <div className="max-w-[900px] mx-auto mb-4">
      <h3 className="text-sm text-white mb-3 mt-3">Popular Albums</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 border border-[#ffffff1a] p-3 rounded-lg min-w-[140px] max-w-[140px] h-[200px] flex-shrink-0 shadow-md"
          >
            <img
              src={album.image}
              alt={album.name}
              className="w-full h-[90px] object-cover rounded-md mb-1.5 cursor-pointer"
              onClick={() => handlePlaylist(album.id)}
            />
            <h4 className="text-white font-semibold text-xs mb-0.5 truncate">{album.name}</h4>
            <p className="text-gray-400 text-xs mb-1">
              {album.artists[0]?.name || "Various Artists"}
            </p>
            <div className="flex items-center space-x-1">
              <button className="text-white hover:text-red-400 transition-colors duration-200 text-md">
                <CiHeart />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-md">
                <MdOutlineFileDownload />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-md">
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
