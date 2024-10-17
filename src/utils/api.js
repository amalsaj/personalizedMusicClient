import axios from "axios";
import { userId } from "./utils";

// Utility function for setting headers
const createHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export const getAlbum = (token) =>
  axios.get("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy", {
    headers: createHeaders(token),
  });

export const getPlaylist = (token) =>
  axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    headers: createHeaders(token),
  });

export const getNewReleases = (token, value) =>
  axios.get(`https://api.spotify.com/v1/browse/new-releases?market=${value}`, {
    headers: createHeaders(token),
  });

export const getFollow = (token) =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", {
    headers: createHeaders(token),
  });

export const popularAlbums = (token) =>
  axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: createHeaders(token),
  });

export const artistAlbums = (id, token) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
    headers: createHeaders(token),
  });

export const getTracksPlaylist = (id, token) =>
  axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    headers: createHeaders(token),
  });

export const getTracksAlbum = (id, token) =>
  axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    headers: createHeaders(token),
  });

export const getTracksArtist = (id, token) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
    headers: createHeaders(token),
  });
