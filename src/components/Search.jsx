import React, { useState } from "react";
import { search } from "../utils/api";

const MusicSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("track");

  const token = localStorage.getItem("token");

  const searchMusic = async (term, type) => {
    try {
      const response = await search(term, type, token);
      let searchItems = [];

      if (type === "track") {
        searchItems = response.data.tracks.items.map((value) => ({
          name: value.name,
          albumImage: value.album.images[0]?.url || "",
          artists : value.artists.slice(0, 2).map((artist) => artist.name).join(", "),
          id: value.id,
          album: value.album.name,
        }));
      } else if (type === "album") {
        searchItems = response.data.albums.items.map((value) => ({
          name: value.name,
          albumImage: value.images[0]?.url || "",
          artists: value.artists.slice(0, 2).map((artist) => artist.name).join(", "),
          id: value.id,
        }));
      }

      setSearchResults(searchItems);
      console.log("searchItems: ", searchItems);
      return searchItems;
    } catch (error) {
      console.error("Error fetching music:", error);
      setSearchResults([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true);
      await searchMusic(searchTerm, searchType);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-center drop-shadow-lg">Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center w-full max-w-2xl mb-6 space-y-4 md:space-y-0 md:space-x-2">
        <div className="flex flex-row space-x-2 w-full">
          <input
            type="text"
            placeholder="Search for music..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="flex-grow p-2 bg-[#2c2f33] text-gray-400 rounded-sm focus:outline-none w-24 md:w-52" // Adjusted width for mobile
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 bg-[#2c2f33] text-gray-400 rounded-sm focus:outline-none w-20 md:w-32" // Adjusted width for mobile
          >
            <option value="track">Track</option>
            <option value="album">Album</option>
          </select>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 shadow-md w-20 md:w-32" // Adjusted width for mobile
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results Section */}
      <div className="w-full max-w-2xl mb-6">
        {loading ? (
          <p className="text-lg text-gray-300">Loading...</p>
        ) : searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="flex items-center p-3 bg-[#2b1a35] rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:bg-[#3b2c4a] cursor-pointer"
              >
                <img
                  src={item.albumImage}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-md shadow-lg mr-3"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition duration-200">{item.name}</h3>
                  <p className="text-gray-400 text-sm overflow-ellipsis">{item.artists}</p>
                  {/* {searchType === "track" && <p className="text-gray-500 text-xs">{item.album}</p>} */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-300">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default MusicSearchPage;
