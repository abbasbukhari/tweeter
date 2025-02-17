const fs = require('fs');
const path = require('path');
const tweetsFilePath = path.join(__dirname, '../data-files/initial-tweets.json');

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const getTweets = (callback) => {
  fs.readFile(tweetsFilePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    const tweets = JSON.parse(data);
    callback(null, tweets);
  });
};

const saveTweet = (newTweet, callback) => {
  getTweets((err, tweets) => {
    if (err) {
      return callback(err);
    }
    tweets.push(newTweet);
    fs.writeFile(tweetsFilePath, JSON.stringify(tweets, null, 2), 'utf8', (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

module.exports = { generateRandomId, getTweets, saveTweet };