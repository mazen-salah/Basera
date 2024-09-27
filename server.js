// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.VIRUS_TOTAL_API_KEY;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API route to send the API key to the front-end
app.get("/api-key", (req, res) => {
  res.json({ apiKey: API_KEY });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Don't forget to create a .env file in the root directory of your project and add the following line to it:
//VIRUS_TOTAL_API_KEY=your-api-key