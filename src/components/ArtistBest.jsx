import React, { useEffect, useState } from "react";
import { artistAlbums } from "../utils/api"; // Ensure this function is correctly implemented
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "../utils/utils";

const ArtistBest = ({ searchTerm, id, setTrackUri, setValue, setApiType }) => {
  const [artistPopular, setArtistPopular] = useState([]);
  const [artistName, setArtistName] = useState("");
  const token = localStorage.getItem("token");

  const handlePlaylist = (id) => {
    localStorage.setItem("id", id);
    setValue(true);
    setApiType("artist");
  };

  const fetchArtistBest = async () => {
    try {
      const newArtistAlbums = await artistAlbums(`${id}`, token);

      setArtistName(newArtistAlbums.data.items[0].artists[0].name);
      console.log("artistName: ", artistName);

      const artistAlbumPopular = newArtistAlbums.data.items.map((value) => ({
        name: value.name,
        image: value.images[0]?.url || "",
        releaseDate: formatDate(value.release_date),
        artists: value.artists || [],
        total: value.total_tracks,
        trackUri: value.uri,
        id: value.artists[0].id,
      }));
      setArtistPopular(artistAlbumPopular);
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

  useEffect(() => {
    fetchArtistBest();
  }, []);

  return (
    // Featured Albums
    <div className="max-w-[1000px] overflow-hidden mx-auto mb-6">
      <h3 className="text-lg text-white mb-4">
        Best of {artistName || "Artist's Best"}
      </h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {artistPopular.map((value, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 backdrop-blur-lg border border-[#ffffff1a] p-4 rounded-xl min-w-[160px] max-w-[160px] h-[240px] flex-shrink-0 shadow-lg
            sm:min-w-[180px] sm:max-w-[180px] sm:h-[260px]" // Compact on small screens
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-full h-[100px] sm:h-[120px] object-cover rounded-lg mb-2 shadow-md" // Reduced height on small screens
              onClick={() => handlePlaylist(value.id)}
            />
            <h4 className="text-white font-semibold text-sm sm:text-base mb-1 truncate max-w-sm">
              {value.name}
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              {value.artists[0]?.name || "Various Artists"}
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

export default ArtistBest;
