$(document).ready(function () {
    console.log("Character counter script loaded!");
  
    // Attach an input event handler to the textarea
    $(".new-tweet textarea").on("input", function () {
      const maxChars = 140; // Maximum allowed characters
      const charCount = $(this).val().length; // Get the length of the input
      const remainingChars = maxChars - charCount; // Calculate remaining characters
  
      // Traverse the DOM to find the counter element
      const counter = $(this).closest("form").find(".counter");
  
      // Update the counter value
      counter.text(remainingChars);
  
      // Update counter color based on the character count
      if (remainingChars < 0) {
        counter.addClass("invalid"); // Add red styling for invalid input
      } else {
        counter.removeClass("invalid"); // Reset to normal styling
      }
    });
  });
  