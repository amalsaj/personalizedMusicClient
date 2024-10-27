import React, { useState, useEffect } from "react";
import { search } from "../utils/api";
import { FaArrowLeft } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const MusicSearchPage = ({ setSearch, setTrackUri }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("track");
  const token = localStorage.getItem("token");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const searchMusic = async (term, type) => {
    if (!term) return;
    setLoading(true);
    try {
      const response = await search(term, type, token);
      let searchItems = [];

      if (type === "track") {
        searchItems = response.data.tracks.items.map((item) => ({
          name: item.name,
          albumImage: item.album.images[0]?.url || "",
          artists: item.artists.slice(0, 2).map((artist) => artist.name).join(", "),
          id: item.uri,
          album: item.album.name,
        }));
      } else if (type === "album") {
        searchItems = response.data.albums.items.map((item) => ({
          name: item.name,
          albumImage: item.images[0]?.url || "",
          artists: item.artists.slice(0, 2).map((artist) => artist.name).join(", "),
          id: item.id,
        }));
      }

      setSearchResults(searchItems);
    } catch (error) {
      console.error("Error fetching music:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchMusic, 500);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm, searchType);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, searchType]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleBackClick = () => setSearch(false);

  const handleResultClick = (itemName, id) => {
    setTrackUri(id);
    searchMusic(itemName, searchType);
    setRecentSearches((prev) => {
      if (!prev.includes(itemName)) {
        const updatedRecentSearches = [itemName, ...prev].slice(0, 5); // limit to 5 items
        localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
        return updatedRecentSearches;
      }
      return prev;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const removeRecentSearchItem = (item) => {
    const updatedSearches = recentSearches.filter((search) => search !== item);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="min-h-screen flex flex-col text-white p-4">
      {/* Container for back button and search bar */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleBackClick}
          className="text-gray-400 hover:text-white transition duration-200 mr-2 flex items-center"
        >
          <FaArrowLeft />
        </button>
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 flex-grow">
          <BiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent text-gray-300 focus:outline-none"
          />
        </div>
      </div>

      {searchTerm === "" && recentSearches.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-400 text-sm mb-2">Recent Searches</h2>
            <button
              onClick={clearRecentSearches}
              className="text-gray-400 text-xs hover:underline"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {recentSearches.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-900 rounded-lg p-2"
              >
                <div
                  onClick={() => handleResultClick(item)}
                  className="text-gray-300 cursor-pointer hover:bg-gray-800 transition duration-200 flex-grow"
                >
                  {item}
                </div>
                <AiOutlineClose
                  onClick={() => removeRecentSearchItem(item)}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer ml-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : searchTerm || recentSearches.length > 0 ? (
          searchResults.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResultClick(item.name, item.id)}
              className="flex items-center p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer"
            >
              <img
                src={item.albumImage}
                alt={`${item.name} album cover`}
                className="w-12 h-12 rounded-md mr-3"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.artists}</p>
              </div>
              <BsThreeDotsVertical className="text-gray-400" />
            </div>
          ))
        ) : (
          searchTerm !== "" && <p className="text-gray-400">No results found</p>
        )}
      </div>
    </div>
  );
};

export default MusicSearchPage;
