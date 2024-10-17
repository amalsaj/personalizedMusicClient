import React, { useEffect, useState } from "react";
import { getNewReleases } from "../utils/api";
import { formatDate } from "../utils/utils";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const TrendySongs = ({ setValue ,setApiType}) => {
  const [releases, setReleases] = useState([]);

  const token = localStorage.getItem("token");

  const handlePlaylist = (id) => {
    localStorage.setItem("id", id);
    setValue(true);
    setApiType("album")
  };

  const fetchTrendingSongs = async () => {
    try {
      const newTrending = await getNewReleases(token);
      const episodeData = newTrending.data.albums.items.map((episode) => ({
        name: episode.name,
        image: episode.images[0]?.url,
        releaseDate: formatDate(episode.release_date),
        artists: episode.artists[0],
        total: episode.total_tracks,
        trackUri: episode.uri,
        id: episode.id,
      }));
      setReleases(episodeData);
      console.log("episodeData: ", episodeData);
    } catch (error) {
      console.error("Error fetching trending songs:", error);
    }
  };

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  return (
    <div className="max-w-[1000px] overflow-hidden mx-auto mb-6">
      <h3 className="text-lg text-white mb-4">Trendy Songs</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {releases.map((value, index) => (
          <div
            key={index}
            className="bg-[#2b1a35] bg-opacity-50 backdrop-blur-lg border border-[#ffffff1a] p-4 rounded-xl min-w-[180px] max-w-[180px] h-[260px] flex-shrink-0 shadow-lg"
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-full h-[120px] object-cover rounded-lg mb-3 shadow-md"
              onClick={() => handlePlaylist(value.id)}
            />
            <h4 className="text-white font-semibold text-base mb-1 truncate max-w-sm">
              {value.name}
            </h4>
            <p className="text-gray-400 text-sm mb-3">{value.artists.name}</p>
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

export default TrendySongs;
