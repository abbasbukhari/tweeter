const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Placeholder tweets
let tweets = [];

// Routes
app.post('/tweets', (req, res) => {
  const tweet = req.body.text;
  if (!tweet) {
    return res.status(400).send('Tweet content cannot be empty.');
  }
  tweets.push({ text: tweet, created_at: new Date() });
  res.status(201).send('Tweet created!');
});

app.get('/tweets', (req, res) => {
  res.status(200).json(tweets);
});

// Start server
app.listen(PORT, () => {
  console.log(`Tweeter app listening on port ${PORT}`);
});
