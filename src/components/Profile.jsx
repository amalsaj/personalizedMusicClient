import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PopularAlbums from "./PopularAlbum";
import ArtistBest from "./ArtistBest";
import Artist from "./Artist";
import FriendsList from "../components/FriendsList";
import Player from "../components/Player";
import Navbar from "./Header";
import Songs from "./Songs";

const Profile = ({ setTrackUri, trackUri }) => {
  const [value, setValue] = useState(false);
  const [apiType, setApiType] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#38304d] to-[#2d223b]">
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <div className="flex-grow p-6 overflow-y-auto">
          {!value && <Navbar />}
          {!value && <Artist />}
          {!value ? (
            <>
              <PopularAlbums setValue={setValue} setApiType={setApiType} />
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
            </>
          ) : (
            <Songs
              setTrackUri={setTrackUri}
              trackUri={trackUri}
              setValue={setValue}
              apiType={apiType}
            />
          )}
        </div>
        {!value && (
          <FriendsList className="hidden md:flex w-[300px] border-l border-gray-700" />
        )}
      </div>
      <Player
        className="fixed bottom-0 left-0 w-full border-t border-gray-700"
        trackUri={trackUri}
      />
    </div>
  );
};

export default Profile;
