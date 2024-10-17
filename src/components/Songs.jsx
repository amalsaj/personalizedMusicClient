import React, { useEffect, useState } from "react";
import {
  getTracksAlbum,
  getTracksArtist,
  getTracksPlaylist,
} from "../utils/api";
import { formatDuration } from "../utils/utils";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa"; // Importing FaArrowLeft icon

const Songs = ({ setTrackUri, trackUri, setValue, apiType }) => {
  // Receive setValue as a prop
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [image, setImage] = useState("");
  const [artist, setArtist] = useState("");
  const [totalTracks, setTotalTracks] = useState("");
  const [duration, setDuration] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const fetchSongs = async () => {
    try {
      let newSongs;
      let image, artist, totalTracks, duration;

      if (apiType === "artist") {
        newSongs = await getTracksArtist(`${id}`, token);
        const extractedPlaylist = newSongs.data.tracks.map((track) => ({
          image: track.album.images[0].url,
          songName: track.name,
          artistName: track.artists[0].name,
          duration: formatDuration(track.duration_ms),
          trackUri: track.uri,
        }));
        setSongs(extractedPlaylist);

        // Set additional values for artist
        artist = newSongs.data.artists[0].name;
        totalTracks = newSongs.data.tracks.length;
        duration = formatDuration(
          newSongs.data.tracks.reduce(
            (acc, track) => acc + track.duration_ms,
            0
          )
        );
        image = newSongs.data.tracks[0].album.images[0].url; // Assuming you want the image of the first track
      } else if (apiType === "album") {
        newSongs = await getTracksAlbum(`${id}`, token);
        const extractedPlaylist = newSongs.data.items.map((track) => ({
          songName: track.name,
          artistName: track.artists[0].name,
          duration: formatDuration(track.duration_ms),
          trackUri: track.uri,
        }));
        setSongs(extractedPlaylist);

        artist = newSongs.data.artists[0].name;
        totalTracks = newSongs.data.items[0].track.album.total_tracks;
        duration = formatDuration(
          newSongs.data.items.reduce((acc, track) => acc + track.duration_ms, 0)
        );
        image = newSongs.data.items[0].track.album.images[0].url; // Assuming the album cover image is available
      } else if (apiType === "playlist") {
        newSongs = await getTracksPlaylist(`${id}`, token);
        const extractedPlaylist = newSongs.data.items.map((item) => ({
          image: item.track.album.images[0].url,
          songName: item.track.name,
          artistName: item.track.artists[0].name,
          duration: formatDuration(item.track.duration_ms),
          trackUri: item.track.uri,
        }));
        setSongs(extractedPlaylist);

        artist = newSongs.data.items[0].track.album.artists[0].name;
        totalTracks = newSongs.data.total;
        image = newSongs.data.items[0].track.album.images[0].url;
      } else {
        throw new Error("Invalid API type");
      }

      // Update the state with the values
      setImage(image);
      setArtist(artist);
      setTotalTracks(totalTracks);
      setDuration(duration);
    } catch (error) {
      console.error("Error fetching songs", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const toggleLike = (trackUri) => {
    setLikedSongs((prev) => {
      const newLikedSongs = new Set(prev);
      if (newLikedSongs.has(trackUri)) {
        newLikedSongs.delete(trackUri);
      } else {
        newLikedSongs.add(trackUri);
      }
      return newLikedSongs;
    });
  };

  // Back button click handler
  const handleBackClick = () => {
    setValue(false);
  };

  return (
    <div className="max-w-full mx-auto my-8 p-4 bg-gradient-to-r from-[#2b1a35] via-[#3b2c4a] to-[#4b3d60] bg-opacity-50 backdrop-blur-lg border border-[#ffffff1a] text-white rounded-lg shadow-lg">
      <button
        onClick={handleBackClick}
        className="flex items-center mb-4 text-gray-300 hover:text-red-500"
      >
        <FaArrowLeft className="mr-2" />
      </button>

        <div className="flex items-center mb-6">
          <img
            src={image}
            alt="Album Cover"
            className="w-40 h-40 object-cover rounded-md shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-white">Album</h1>
            <p className="text-md text-gray-300 mt-1">{artist}</p>
            <p className="text-md text-gray-300 mt-1">
              {totalTracks} Songs
            </p>
          </div>
        </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Song
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                <FaClock className="inline-block" /> {/* Duration icon */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {songs.map((song, index) => (
              <tr
                key={index}
                className="hover:bg-gray-800 transition duration-300 relative"
              >
                <td className="px-4 py-4 text-sm text-gray-400">{index + 1}</td>
                <td className="px-4 py-4">
                  <img
                    src={song.image}
                    alt={song.songName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span
                      className="font-semibold cursor-pointer text-lg hover:text-red-500 transition duration-300"
                      onClick={() => setTrackUri(song.trackUri)}
                    >
                      {song.songName}
                    </span>
                    <span className="text-sm text-gray-400">
                      {song.artistName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 flex items-center">
                  <span className="text-gray-400">{song.duration}</span>
                  <button
                    className={`text-gray-400 hover:text-red-500 transition duration-300 ml-4 ${
                      likedSongs.has(song.trackUri) ? "text-red-500" : ""
                    }`}
                    onClick={() => toggleLike(song.trackUri)}
                  >
                    {likedSongs.has(song.trackUri) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <FaPlay className="text-gray-400 hover:text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Songs;
