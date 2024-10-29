const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files in the root (like styles.css and app.js)
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "home")));
app.use(express.static(path.join(__dirname, "platforms")));
app.use(express.static(path.join(__dirname, "link-check")));

// Serve static files for each directory
app.use("/home", express.static(path.join(__dirname, "home")));
app.use("/platforms", express.static(path.join(__dirname, "platforms")));
app.use("/link-check", express.static(path.join(__dirname, "link-check")));


// Route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home", "index.html"));
});

// Route to platforms page
app.get("/platforms", (req, res) => {
  res.sendFile(path.join(__dirname, "platforms", "index.html"));
});

// Route to link-check page
app.get("/link-check", (req, res) => {
  res.sendFile(path.join(__dirname, "link-check", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

