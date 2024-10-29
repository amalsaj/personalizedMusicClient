import React, { useEffect, useState } from "react";
import { getTracksPlaylist } from "../utils/api";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { formatDuration } from "../utils/utils";

const PopularList = ({ setTrackUri }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handlePlaylist = (trackUri) => {
    setTrackUri(trackUri);
  };

  const fetchPopularAlbums = async (id = "37i9dQZF1DX0XUfTFmNBRM") => {
    if (!token) {
      setError("User authentication is required.");
      setLoading(false);
      return;
    }
    try {
      const newPopularAlbums = await getTracksPlaylist(id, token);
      const items = newPopularAlbums?.data?.items;
      if (!items) throw new Error("Album items not found in API response.");

      const albumData = items.map((item) => ({
        image: item.track.album.images[0].url,
        songName: item.track.name,
        artistName: item.track.artists[0].name,
        duration: formatDuration(item.track.duration_ms),
        trackUri: item.track.uri,
      }));
      setAlbums(albumData);
    } catch (error) {
      console.error("Error fetching popular albums:", error);
      setError("Failed to load albums. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAlbums();
  }, []);

  const displayedAlbums = showAll ? albums : albums.slice(0, 5);

  return (
    <div className="max-w-[900px] mx-auto mb-4 text-white">
      <h3 className="text-lg mb-5 mt-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
        Popular Albums
      </h3>
      {loading ? (
        <p className="text-gray-400">Loading albums...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : albums.length === 0 ? (
        <p className="text-gray-400">No popular albums found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {displayedAlbums.map((album, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#2b1a35] to-[#3e214b] border border-[#ffffff1a] p-4 rounded-lg shadow-lg flex flex-col hover:scale-105 transform transition-transform duration-300"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={album.image}
                    alt={album.songName}
                    className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                    onClick={() => handlePlaylist(album.trackUri)}
                  />
                  <div className="ml-4">
                    <h4 className="text-white font-semibold text-base truncate">
                      {album.songName}
                    </h4>
                    <p className="text-gray-400 text-xs">{album.artistName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                  <span className="flex items-center space-x-1">
                    <BiTime className="text-indigo-400" />
                    <span>{album.duration}</span>
                  </span>
                  <div className="flex space-x-2">
                    <button
                      aria-label="Add to favorites"
                      className="hover:text-red-500 transition-colors duration-200"
                    >
                      <CiHeart />
                    </button>
                    <button
                      aria-label="Download"
                      className="hover:text-green-500 transition-colors duration-200"
                    >
                      <MdOutlineFileDownload />
                    </button>
                    <button
                      aria-label="More options"
                      className="hover:text-gray-500 transition-colors duration-200"
                    >
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            {!showAll && albums.length > 5 && (
              <button
                className="px-4 py-2 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
                onClick={() => setShowAll(true)}
              >
                See All
              </button>
            )}
            {showAll && albums.length > 5 && (
              <button
                className="px-4 py-2 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
                onClick={() => setShowAll(false)}
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularList;
