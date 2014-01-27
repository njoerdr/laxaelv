
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */

  var renderImages = function(){
    var images = lax.getImages();
    console.log(images);
    images.forEach(function(element){
      element = JSON.parse(element);
      var item = {id: element, name: element};
      $($.render(imagetemplate, item)).appendTo(resultview);
    });
  };

  var renderTags = function(){
    var tags = lax.getTags();
    console.log(tags)
    tags.forEach(function(element){
      var item = {size: element.weight, tag: JSON.parse(element.tag)};
      $($.render(tagtemplate, item)).appendTo(tagcloudview);
    });
  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var tagtemplate = $("[type='html/tag']").html();

  var resultview = $("#resultview");
  var tagcloudview = $("#tagcloud");

  lax.on("change", function() {
    console.log("change event!");
    renderImages();
    renderTags();
  });

  lax.initDB();



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

  $(".tag").click(function(e){
    lax.addTagToQuery($(this).text());
  });





})();
