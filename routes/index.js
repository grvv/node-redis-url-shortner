const express = require("express");
const router = express.Router();

// const redis = require("redis");
// const redisClient = redis.createClient();

const redisClient = require("../config/redis");

const Url = require("../models/url");

router.get("/:urlCode", redisMiddleware, async (req, res) => {
  console.log("Without cache");

  const { urlCode } = req.params;

  try {
    const url = await Url.findOne({ urlCode });

    if (url) {
      redisClient.setex(urlCode, 3600, url.longUrl);
      res.redirect(url.longUrl);
    } else {
      res.status(404).json("No Url Found!");
    }
  } catch (error) {
    res.status(500).json("Server Error!");
  }
});

function redisMiddleware(req, res, next) {
  const { urlCode } = req.params;

  redisClient.get(urlCode, (err, url) => {
    if (err) throw err;

    if (url !== null) {
      console.log("With cache", url);
      res.redirect(url);
    } else {
      next();
    }
  });
}

module.exports = router;
