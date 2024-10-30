import React, { useEffect, useState } from "react";
import { getTracksPlaylist } from "../utils/api";
import { CiHeart, CiHeartFill } from "react-icons/ci";
import { BsThreeDotsVertical, BsPlayFill } from "react-icons/bs";
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
    <div className="max-w-[900px] mx-auto mb-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">
          Popular
        </h3>
        {!showAll && albums.length > 3 && (
          <button
            className="px-2 py-2 rounded-full text-indigo-500 font-semibold"
            onClick={() => setShowAll(true)}
          >
            See All
          </button>
        )}
        {showAll && albums.length > 5 && (
          <button
            className="px-5 py-2 rounded-full text-indigo-500 font-semibold"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        )}
      </div>
      {loading ? (
        <p className="text-gray-400">Loading albums...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : albums.length === 0 ? (
        <p className="text-gray-400">No popular albums found.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {displayedAlbums.map((album, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#2b1a35] border border-[#ffffff1a] p-4 rounded-lg hover:bg-[#3e214b] transition-all"
            >
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => handlePlaylist(album.trackUri)}
              >
                <img
                  src={album.image}
                  alt={album.songName}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">{album.songName}</h4>
                  <p className="text-gray-400 text-xs">{album.artistName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-1">
                  <BiTime />
                  <span>{album.duration}</span>
                </div>
                <button className="hover:text-red-500">
                  <CiHeart />
                </button>
                <button className="hover:text-gray-500">
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularList;
