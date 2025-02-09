$(() => {
  const toggleNav = (jqMakeTweet, jqDownArrow, jqScrollUp, action) => {
    if (action === 'show') {
      jqScrollUp.fadeIn(500);
      jqMakeTweet.fadeOut(500);
      jqDownArrow.fadeOut(500);
    } else {
      jqScrollUp.fadeOut(500);
      jqMakeTweet.fadeIn(500);
      jqDownArrow.fadeIn(500);
    }
  };
  const browser = $(document);
  const scrollUp = $('i.fa-angle-double-up');
  const form = $('.new-tweet');
  const makeTweetText = $('#make-tweet');
  const downArrow = $('.fa-angle-double-down');
  browser.scroll(() => {
    if (browser.scrollTop() >= 400) toggleNav(makeTweetText, downArrow, scrollUp, 'show');
    else toggleNav(makeTweetText, downArrow, scrollUp, 'hide');
    
  });
  scrollUp.on('click', () => {
    form.slideDown();
    $('html').animate({ scrollTop: 0 }, 'slow');
    $('textarea').focus();
  });
});