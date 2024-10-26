export const clientID = "a15a2aaee85e44c89447098ef261b3a8";
export const clientSecret = "c1c83d41f33c47da82e92d6e670e70dd";
export const userId = "31gktuua2xq6ifjtgpf7ertxdk7q";
export const UrlDev="http://localhost:8000"
export const Urlpro="https://personalizedmusicserver.onrender.com"

export 
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDuration = (durationMs) => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};