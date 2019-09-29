const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/url");

/**
 * @route    /shortenUrl
 * @dec      creates shorten url
 */

router.post("/", async (req, res) => {
  const { url: longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  console.log("API hit");

  // Checking base url
  // if (!validUrl.isUri(baseUrl)) res.status(401).json("Invalid base url");

  if (!longUrl || !validUrl.isUri(longUrl)) {
    res.status(401).json("No Url or Invalid Url");
  } else {
    try {
      const url = await Url.findOne({ longUrl });

      if (url) res.json(url);
      else {
        // creating url
        const urlCode = shortId.generate();
        const shortUrl = `${baseUrl}/${urlCode}`;

        const url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          createdAt: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      res.status(500).json("Server Error!");
    }
  }
});

module.exports = router;
