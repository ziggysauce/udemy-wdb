$('ul').on('click', 'li', function() {
  $(this).toggleClass('completed');
});

// Click on X to delete to-do
$('ul').on('click', 'span', function(e) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  e.stopPropagation();
});

$('input[type="text"]').keypress(function(e) {
  if (e.which === 13) {
    // get new todo from text input
    let todoText = $(this).val();
    $(this).val('');
    // create new li and add to ul
    $('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
  }
});

$(".fa-plus").click(function() {
  $("input[type='text']").fadeToggle();
});
