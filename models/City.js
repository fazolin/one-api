// models/City.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  city: String,
  city_ascii: String,
  lat: Number,
  lng: Number,
  country: String,
  iso2: String,
  iso3: String,
  admin_name: String,
  capital: String,
  population: Number,
  id: Number,
});

module.exports = mongoose.model("City", citySchema);
