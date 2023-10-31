const express = require('express');
const app = express()
const cors = require('cors');
const colorsController = require("./controllers/colorsController.js");

app.use(cors());
app.use(express.json())
app.use("/colors", colorsController);

app.get('/', (req, res) => {
    res.send("Welcome to Colors App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;