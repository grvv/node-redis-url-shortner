const mongoose = require("mongoose");

// Creating new instance of mongoose schema with properties and their type
const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  createdAt: { type: String, default: Date.now }
});

// exporting by "specifying name with mongoose schema instance"
module.exports = mongoose.model("url", urlSchema);
