// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const City = require("./models/City");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const mongoURI = process.env.URL_MONGODB_ATLAS;
mongoose.connect(mongoURI);

app.get("/cities", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
