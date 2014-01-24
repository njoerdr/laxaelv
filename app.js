
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */
  /*window.lax = new Lax();*/

  // HTML for a single todo item
  var template = $("[type='html/tumb']").html();
  var resultview = $("#resultview");

  for(var i = 0; i != store.length; i++) {
    var item = {id: i+1, name: store[i]};
    var el = $($.render(template, item)).appendTo(resultview);
  }

  $("figure>button").fadeOut();
  $("figure>figcaption").fadeOut();

  /* Listen to user events */

  $("img").click(function() {
    console.log(this.id);
  });

  $("figure").mouseenter(function() {
    $("button", this).fadeIn();
    $("figcaption", this).fadeIn();
  });

  $("figure").mouseleave(function() {
    $("button", this).fadeOut(0);
    $("figcaption", this).fadeOut(0);
  });

})();
