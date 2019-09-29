const express = require("express");
const connectDb = require("./config/db");

// const redis = require("redis");
// const client = redis.createClient();

// client.on("connect", () => console.log("Redis client connected"));

// client.on("error", ({ message: msg }) =>
//   console.log("Redis client Error: ", msg)
// );

// Starting express app;
const app = express();

// connecting database
connectDb();

// Adding middleware to accept json data from the api
app.use(express.json({ extended: false }));

// Defining Routes
app.use("/", require("./routes/index"));
app.use("/shortenUrl", require("./routes/shortenUrl"));

const PORT = process.env.PORT || 5000;

// starting express server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
