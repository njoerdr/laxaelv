
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */

  var renderImages = function(){
    $("#resultview figure").remove("figure");
    var images = lax.getImages();
    images.forEach(function(element){
      //element = JSON.parse(element);
      var item = {id: element, name: element};
      $($.render(imagetemplate, item)).appendTo(resultview);
    });
  };

  var renderTags = function(){
    $("#tagcloud").empty();
    $("#query").empty();

    var tags = lax.getTags();
    tags.forEach(function(element){
      var item = {size: element.weight, tag: element.tag};
      $($.render(tagtemplate, item)).appendTo(tagcloudview);
    });

    lax.getQueryTags().forEach(function(element){
      var item = {size: "small", tag: element};
      $($.render(tagtemplate, item)).appendTo(querybox);
    });

    $("#tagcloud .tag").click(function(e){
    lax.addTagToQuery($(this).text());
  });

  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var tagtemplate = $("[type='html/tag']").html();

  var resultview = $("#resultview");
  var tagcloudview = $("#tagcloud");
  var querybox = $("#query");

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

  $("#querybox button").click(function(){
    lax.resetQuery();
  });







})();
