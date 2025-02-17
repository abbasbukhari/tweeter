"use strict";

const express = require('express');

module.exports = (DataHelpers) => {
  const router = express.Router();

  router.get('/tweets', (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        console.error("Error fetching tweets:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Fetched tweets:", tweets);
      res.json(tweets);
    });
  });

  router.post('/tweets', (req, res) => {
    const newTweet = {
      user: {
        name: "User Name",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@username"
      },
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(newTweet, (err) => {
      if (err) {
        console.error("Error saving tweet:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Saved new tweet:", newTweet);
      res.json(newTweet);
    });
  });

  return router;
};
