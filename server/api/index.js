// api/index.js
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

module.exports = (req, res) => {
  return app(req, res);
};
