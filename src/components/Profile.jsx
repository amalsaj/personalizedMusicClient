import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PopularAlbums from "./PopularAlbum";
import ArtistBest from "./ArtistBest";
import Artist from "./Artist";
import FriendsList from "../components/FriendsList";
import Player from "../components/Player";
import Navbar from "./Header";
import Songs from "./Songs";
import BottomNav from "./BottomNav"; // Import the BottomNav component
import User from "./User";
import Search from './Search';
import PopularList from "./List";
import End from "./End";

const Profile = ({ setTrackUri, trackUri }) => {
  const [value, setValue] = useState(false);
  const [apiType, setApiType] = useState("");
  const [search, setSearch] = useState(false);
  console.log('search: ', search);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#38304d] to-[#2d223b]">
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar for larger screens */}
        <div className="hidden md:flex">
          
          < Sidebar />
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
        {!value && !search && <Navbar setSearch={setSearch} />}
          <div className="md:hidden">{!value && !search && <User setSearch={setSearch} />}</div>
          <div className="hidden md:block">{!value && !search && <Artist />}</div>

          {/* Check if value is false and search is false */}
          {!value && !search ? (
            <>
              <PopularAlbums setValue={setValue} setApiType={setApiType}/>
              <ArtistBest
                id={"1qFp8zDvsXyCsC5dqz8X4S"}
                setValue={setValue}
                setApiType={setApiType}
              />
              <ArtistBest
                id={"19LIHDDSHBD5NyYHI3gpzB"}
                setValue={setValue}
                setApiType={setApiType}
              />
              <PopularList setTrackUri={setTrackUri}/>
              <End/>
            </>
          ) : (
            // If search is true, show the Search component
            search ? (
              <Search setSearch={setSearch} setTrackUri={setTrackUri}/>
            ) : (
              <Songs
                setTrackUri={setTrackUri}
                trackUri={trackUri}
                setValue={setValue}
                apiType={apiType}
              />
            )
          )}
        </div>
        {/* FriendsList only visible on medium screens and larger */}
        {!value && <FriendsList className="w-[300px] border-l border-gray-700" />}
      </div>
      {/* Player - Fixed at bottom on all screen sizes */}
      <Player
        className="fixed bottom-5 left-0 w-full border-t border-gray-700 sm:bottom-0"
        trackUri={trackUri}
      />

      {/* Bottom Navigation (only visible on mobile screens) */}
      <div className="md:hidden">
        <BottomNav  setSearch={setSearch}/>
      </div>
    </div>
  );
};

export default Profile;
