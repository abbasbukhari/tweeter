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
  
      const tweetText = $("#tweet-text").val(); // Get the value of the tweet input
      const errorMessage = validateTweet(tweetText);
  
      if (errorMessage) {
        alert(errorMessage); // Show alert for error
        return; // Stop form submission
      }
  
      // If no validation errors, submit form data using AJAX POST
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // Serialize form data for submission
        success: () => {
          $("#tweet-text").val(""); // Clear the form after successful submission
          $(".counter").text(140); // Reset the character counter
          loadTweets(); // Reload tweets
        },
        error: (err) => {
          console.error("Error submitting tweet:", err);
        }
      });
    });
  });
  