const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("connect", () => console.log("Redis client connected"));

redisClient.on("error", ({ message: msg }) =>
  console.log("Redis client Error: ", msg)
);

module.exports = redisClient;
