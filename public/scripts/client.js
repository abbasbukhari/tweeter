$(document).ready(function () {
  // Function to show error messages
  const showError = (message) => {
    const $error = $("#error-message");
    $error.text(message).slideDown();
  };

  // Function to hide error messages
  const hideError = () => {
    const $error = $("#error-message");
    $error.slideUp();
  };

  // Update the counter and show error dynamically
  $("#tweet-text").on("input", function () {
    const charCount = 140 - $(this).val().length;
    $(".counter").text(charCount);

    if (charCount < 0) {
      $(".counter").addClass("counter-error");
      showError("Your tweet exceeds the character limit!");
    } else {
      $(".counter").removeClass("counter-error");
      hideError(); // Remove error message if character count is valid
    }
  });

  // Form submission logic
  $("form").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();

    // Hide any previous errors
    hideError();

    // Validate input
    if (!tweetText) {
      showError("Tweet cannot be empty!");
      return;
    }

    if (tweetText.length > 140) {
      showError("Tweet exceeds maximum character limit!");
      return;
    }

    // Send the tweet via AJAX
    const serializedData = $(this).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
      success: () => {
        $("#tweet-text").val(""); // Clear the input
        $(".counter").text(140).removeClass("counter-error"); // Reset the counter
        hideError(); // Ensure no error messages are displayed
        loadTweets(); // Reload tweets dynamically
      },
      error: (err) => {
        console.error("Error posting tweet:", err);
      },
    });
  });

  // Load tweets dynamically
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

  // Render tweets
  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    tweets.reverse().forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    });
  };

  // Create a single tweet element
  const createTweetElement = (tweet) => {
    return $(`
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
  };

  // Initial load
  loadTweets();
});
