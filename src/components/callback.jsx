import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import SkeletonLoader from "./loader"; // Ensure the path is correct

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const { code, state } = queryString.parse(window.location.search);

      if (code && state) {
        try {
          const response = await axios.get(
            `http://localhost:8000/callback?code=${code}&state=${state}`
          );
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);

          navigate("/profile");
        } catch (err) {
          console.error("Error fetching tokens:", err);
          setError("Failed to retrieve access token. Please try again.");
        } finally {
          setLoading(false); // Set loading to false regardless of success or error
        }
      } else {
        setLoading(false);
        setError("State mismatch or invalid code. Please try again.");
      }
    };

    fetchTokens();
  }, [navigate]);

  // Show skeleton loader while loading
  if (loading) {
    return <SkeletonLoader />;
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  // Show processing message if no errors occurred
  return (
    <div className="flex items-center justify-center h-screen">
      <h2>Processing your request...</h2>
    </div>
  );
};

export default Callback;
