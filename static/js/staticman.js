// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function ($) {
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;

    $(form).addClass('form--loading');

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showModal('Perfect !', 'Thanks for your comment! It will show on the site once it has been approved. .');
        $(form).removeClass('form--loading');
      },
      error: function (err) {
        console.log(err);
        showModal('Error', 'Sorry, there was an error with the submission!');
        $(form).removeClass('form--loading');
      }
    });

    return false;
  });

  $('.js-close-modal').click(function () {
    $('body').removeClass('show-modal');
  });

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);

    $('body').addClass('show-modal');
  }

  $('.comment-reply-btn a').click(function (){
    $('input[name="fields[replyThread]"]').val(this.title);
    $('input[name="fields[replyID]"]').val(this.id);
    authorTag = $(this).parents('.static-comment').children('h4.comment-author');
    $('input[name="fields[replyName]"]').val(authorTag.text());
    $('.js-form fieldset button.button').text('Submit reply');
  });

  $('.js-form fieldset button[type="reset"]').click(function (){
    $('input[name="fields[replyThread]"]').val("");
    $('input[name="fields[replyID]"]').val("");
    $('input[name="fields[replyName]"]').val("");
    $('.js-form fieldset button.button').text('Submit');
  });


  $('.comment-reply-target a[href^="#"]').click(function (){
    targetPostID = $(this).attr('href');
    targetID = "#" + $(targetPostID).parents('.static-comment').attr('id');
    $('html, body').animate({ scrollTop: $(targetID).offset().top-$('nav').height() }, 500);
  });
})(jQuery);
