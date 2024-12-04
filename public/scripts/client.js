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
          <span>${timeago.format(tweet.created_at)}</span>
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
  
  // Function to load tweets using AJAX GET
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.error("Error fetching tweets:", err);
      }
    });
  };
  
  // Document Ready
  $(document).ready(() => {
    // Load tweets on page load
    loadTweets();
  });
  