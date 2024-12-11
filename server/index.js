const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Dummy data
const tweets = require("../data-files/initial-tweets.json");

// Define Alex Smith's profile
const alexSmithProfile = {
  name: "Alex Smith",
  avatars: "/images/profile-hex.png", // Updated to use local file
  handle: "@alex"
};

// Routes
app.get("/tweets", (req, res) => {
  res.json(tweets);
});

app.post("/tweets", (req, res) => {
  if (!req.body.text || req.body.text.trim() === "") {
    return res.status(400).send("Tweet cannot be empty");
  }
  if (req.body.text.length > 140) {
    return res.status(400).send("Tweet exceeds 140 characters");
  }

  const newTweet = {
    user: alexSmithProfile, // Always use Alex Smith's profile
    content: {
      text: req.body.text
    },
    created_at: Date.now()
  };

  tweets.unshift(newTweet);
  res.status(201).send("Tweet created");
});

// Start server
app.listen(PORT, () => {
  console.log(`Tweeter app listening on port ${PORT}`);
});
