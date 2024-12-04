// Sample tweet data for testing
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="tweet-user">
            <img src="${tweet.user.avatars}" alt="User Avatar">
            <h3>${tweet.user.name}</h3>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>${timeAgo(tweet.created_at)}</span>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };
  
  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    const $container = $('#tweets-container');
    $container.empty(); // Clear container before appending
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $container.append($tweet);
    }
  };
  
  // Escape function to prevent XSS attacks
  const escape = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Time conversion utility
  const timeAgo = function(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60
    };
  
    for (const [key, value] of Object.entries(intervals)) {
      const result = Math.floor(seconds / value);
      if (result > 0) {
        return `${result} ${key}${result > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };
  
  // Render the sample data on page load
  $(document).ready(() => {
    renderTweets(data);
  });
  