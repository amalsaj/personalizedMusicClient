import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Callback from "./components/callback";
import SignInPage from "./components/signIn.jsx";
import Profile from "./components/Profile";

const App = () => {
  const [trackUri, setTrackUri] = useState(""); // State to store the track URI

  return (
    <div className="dark">
      {/* This enables dark mode */}
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route
            path="/profile"
            element={<Profile setTrackUri={setTrackUri} trackUri={trackUri} />}
          />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
