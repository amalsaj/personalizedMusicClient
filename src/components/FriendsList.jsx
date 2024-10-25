import { useEffect, useState } from "react";
import { getFollow } from "../utils/api";

const FollowListByUser = () => {
  const [followUser, setFollow] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch followed artists data
  const fetchSpotifyData = async () => {
    try {
      const followResponse = await getFollow(token);
      const follow = followResponse.data.artists.items.map((artist) => ({
        id: artist.id, // Use a unique id for each artist
        name: artist.name,
        image:
          artist.images.length > 0
            ? artist.images[0].url
            : "https://via.placeholder.com/50",
        isFollowing: true,
      }));
      setFollow(follow);
    } catch (error) {
      setError("Error fetching follow data. Please try again.");
    }
  };

  useEffect(() => {
    fetchSpotifyData();
  }, []);

  const toggleFollow = (id) => {
    setFollow((prevFollowUser) =>
      prevFollowUser.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const toggleShowAll = () => {
    setShowAll((prevState) => !prevState);
  };

  const displayedUsers = showAll ? followUser : followUser.slice(0, 4);

  return (
   <div className="hidden md:flex justify-center items-start min-h-screen pt-10">
      <div className="max-w-xs w-72 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 m-6">
        <h3 className="text-lg font-semibold text-white mb-3">Follow</h3>
        <hr className="bg-white/30 mb-3" />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="space-y-3">
          {displayedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-transparent p-2 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-white/20"
                />
                <span className="text-white text-sm">{user.name}</span>
              </div>
              <button
                onClick={() => toggleFollow(user.id)}
                className={`px-3 py-1 text-xs border border-white rounded-full transition-colors ${
                  user.isFollowing
                    ? "bg-transparent text-white"
                    : "bg-transparent text-white"
                } hover:bg-white hover:text-gray-900`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        {followUser.length > 4 && (
          <div className="mt-4 text-center">
            <span
              onClick={toggleShowAll}
              className="cursor-pointer text-green-400 hover:underline text-sm"
            >
              {showAll ? "Show Less" : "Show All"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowListByUser;
