$(() => {
  const formArrow = $('.fa-angle-double-down');
  formArrow.on('click', () => {
    const form = $('.new-tweet');
    form.slideToggle(500);
    $('textarea').focus();
  });
});