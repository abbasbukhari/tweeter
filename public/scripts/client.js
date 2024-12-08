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
  
  // Function to validate the form input
  const validateTweet = function(tweetText) {
    if (!tweetText.trim()) {
      return "Tweet content cannot be empty.";
    }
    if (tweetText.length > 140) {
      return "Tweet content exceeds the 140-character limit.";
    }
    return null;
  };
  
  // Document Ready
  $(document).ready(() => {
    // Load tweets on page load
    loadTweets();
  
    // Handle form submission
    $("form").on("submit", function(event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Hide any existing error messages
      $("#error-message").slideUp();
  
      const tweetText = $("#tweet-text").val(); // Get the value of the tweet input
      const errorMessage = validateTweet(tweetText);
  
      if (errorMessage) {
        // Display error message
        $("#error-message").text(errorMessage).slideDown();
        return; // Stop form submission
      }
  
      // If no validation errors, submit form data using AJAX POST
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // Serialize form data for submission
        success: (newTweet) => {
          $("#tweet-text").val(""); // Clear the form after successful submission
          $(".counter").text(140); // Reset the character counter
          $("#error-message").slideUp(); // Hide error message if visible
  
          // Dynamically render the new tweet at the top of the container
          const $newTweet = createTweetElement(newTweet);
          $("#tweets-container").prepend($newTweet);
        },
        error: (err) => {
          console.error("Error submitting tweet:", err);
        }
      });
    });
  });
  