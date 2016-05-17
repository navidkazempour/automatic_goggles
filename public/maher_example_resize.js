$(function() {
  $( window ).resize(function() {
    $(".cell").each(function() {
      $(this).height($(this).width());
    });
  });

  $(".cell").each(function() {
    $(this).height($(this).width());
  });
});
