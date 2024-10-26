import React, { useState } from "react";
import { UrlDev,Urlpro } from "../utils/utils";

const SignInPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      window.location.href = `${Urlpro}/login`;
    } catch (error) {
      console.error("Error during login redirect:", error);
      setError("Failed to redirect to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/241/985/129/music-portrait-headphones-girl-dj-girls-closed-eyes-1920x1200-entertainment-music-hd-art-wallpaper-preview.jpg')`, // Music related abstract image
        backgroundSize: "cover",  // Ensures the image covers the entire container
        backgroundPosition: "center",  // Centers the image
        backgroundRepeat: "no-repeat",  // Prevents the image from repeating
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center p-6 bg-opacity-80 rounded-lg max-w-md w-full text-white text-center shadow-lg sm:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">Sign In</h1>
        <p className="text-base sm:text-lg lg:text-xl mb-6 font-light">
          Dive into your personalized music experience.
        </p>

        {error && (
          <div className="mb-4 text-red-600 bg-white bg-opacity-20 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full py-3 px-8 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none transition duration-300 ease-in-out ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 mx-auto text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Sign In with Spotify"
          )}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
