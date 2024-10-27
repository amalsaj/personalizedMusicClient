import React, { useEffect, useState } from "react";
import { artistAlbums } from "../utils/api";
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
    <div className="max-w-[900px] mx-auto mb-4">
      <h3 className="text-sm text-white mb-3 ">
        Best of {artistName || "Artist's Best"}
      </h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {artistPopular.map((value, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 border border-[#ffffff1a] p-3 rounded-lg min-w-[140px] max-w-[140px] h-[200px] flex-shrink-0 shadow-md"
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-full h-[90px] object-cover rounded-md mb-1.5 cursor-pointer"
              onClick={() => handlePlaylist(value.id)}
            />
            <h4 className="text-white font-semibold text-xs mb-0.5 truncate">
              {value.name}
            </h4>
            <p className="text-gray-400 text-xs mb-1">
              {value.artists[0]?.name || "Various Artists"}
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

export default ArtistBest;
