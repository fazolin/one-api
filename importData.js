// importData.js
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const City = require("./models/City");

const mongoURI = process.env.URL_MONGODB_ATLAS;
mongoose.connect(mongoURI);

const results = [];

fs.createReadStream("data/worldcities.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    City.insertMany(results)
      .then(() => {
        console.log("Dados importados com sucesso.");
        mongoose.connection.close();
      })
      .catch((err) => console.error(err));
  });
