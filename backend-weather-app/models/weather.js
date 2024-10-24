const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  queriedAt: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now, index: { expires: "30d" } },
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
