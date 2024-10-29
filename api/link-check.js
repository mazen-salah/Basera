// api/home.js
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '../link-check/index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error loading page');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
};
