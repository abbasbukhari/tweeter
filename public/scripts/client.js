$(document).ready(function () {
  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
            <div>
              <span class="user-name">${tweet.user.name}</span>
              <span class="user-handle">${tweet.user.handle}</span>
            </div>
          </div>
        </header>
        <div class="tweet-content">
          ${$("<div>").text(tweet.content.text).html()} <!-- Escaping for security -->
        </div>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const renderTweets = (tweets) => {
    $("#tweets-container").empty(); // Clear existing tweets
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.error("Error loading tweets:", err);
      },
    });
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();

    if (!tweetText) {
      showError("Tweet cannot be empty!");
      return;
    }

    if (tweetText.length > 140) {
      showError("Tweet exceeds maximum character limit!");
      return;
    }

    const serializedData = $(this).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
      success: (newTweet) => {
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets(); // Dynamically reload tweets after successful submission
      },
      error: (err) => {
        console.error("Error posting tweet:", err);
      },
    });
  });

  const showError = (message) => {
    const $error = $("#error-message");
    $error.text(message).slideDown();
  };

  loadTweets(); // Load tweets on page load
});
