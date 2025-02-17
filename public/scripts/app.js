/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const toggleErrorMessage = (jqErrorMess, error) => {
    if (error === 'empty') {
      jqErrorMess.slideDown(500).text(`Tweet can't be empty!`);
      return false;
    }
    if (error === 'length') {
      jqErrorMess.slideDown(500).text(`Tweet can't exceed more than 140 Characters`);
      return false;
    }
    jqErrorMess.slideUp(500);
    return true;
  };

  const validateForm = (formText) => {
    const errorMessage = $('.error');
    if (!formText.length) return toggleErrorMessage(errorMessage, 'empty');
    if (formText.length > 140) return toggleErrorMessage(errorMessage, 'length');
    return toggleErrorMessage(errorMessage, null);
  };

  const renderTweets = (tweets) => {
    console.log("Rendering tweets:", tweets);
    // Sort tweets by created_at in descending order
    tweets.sort((a, b) => b.created_at - a.created_at);

    // Clear the tweet container
    $('#tweet-container').empty();

    // Loop through each tweet and append it to the tweet container
    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      $('#tweet-container').prepend(tweetElement);
    });
  };

  const createTweetElement = (tweet) => {
    const timeSince = timeago.format(tweet.created_at); // Use timeago.js to format the timestamp
    return `
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <h2>${tweet.user.name}</h2>
          <p>${tweet.user.handle}</p>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span class="time">${timeSince}</span>
          <div class="tweet-icons">
            <i class="fas fa-heart like-btn"></i>
            <i class="fas fa-retweet retweet-btn"></i>
            <i class="fas fa-flag flag-btn"></i>
          </div>
        </footer>
      </article>
    `;
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: "GET" })
      .then(renderTweets)
      .catch(err => console.error("Error loading tweets:", err));
  };

  loadTweets();

  const form = $('form');
  form.on('submit', (event) => {
    event.preventDefault();
    const textArea = form.children('textarea');
    const typedText = textArea.val();
    if (validateForm(typedText)) {
      $.ajax('/tweets', {
        method: "POST",
        data: form.serialize()
      }).then((newTweet) => {
        console.log("New tweet posted:", newTweet);
        textArea.val('');
        form.children('.counter').text('140');
        const tweetElement = createTweetElement(newTweet);
        $('#tweet-container').prepend(tweetElement);
      }).catch(err => console.error("Error posting tweet:", err));
    }
  });
});
