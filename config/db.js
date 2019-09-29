const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("MongoDB Error: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
