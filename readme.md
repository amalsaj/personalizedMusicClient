# Project Title

This project integrates with the Spotify Web API to provide music streaming features. Follow the steps below to set up and run the application locally.

## Prerequisites

- **Node.js** and **npm** installed
- **Spotify Developer Account** (for client and secret IDs)
- **Nodemon** (for automatically restarting the server on changes)

## Setup Instructions

1. **Clone the Repositories**

   Clone both the client and server repositories to your local machine:

   ```bash
   # Clone client repository
   git clone <client-repo-link>

   # Clone server repository
   git clone <server-repo-link>
   ```

2. **Configure Spotify Web API Credentials**

   - Go to the Spotify Developer Dashboard and create an application to get your Client ID and Client Secret.

   - In your cloned server repository, create a `.env` file (if it doesn't exist).

   - Add your Spotify credentials in the `.env` file as follows:

     ```
     CLIENT_ID=your_spotify_client_id
     CLIENT_SECRET=your_spotify_client_secret
     ```

3. **Update Environment URLs for Local Testing**

   If you are testing the application locally, update the URLs as follows:

   - Open `signin.jsx` and `callback.jsx` in the client repository.
   - Change `urlPro` to `urlDev` in both files.

4. **Run the Server and Client**

   Start the server:

   ```bash
   cd server
   nodemon server.js
   ```

   Start the client:

   ```bash
   cd client
   npm run start
   ```
