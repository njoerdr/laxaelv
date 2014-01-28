
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */

  var updateCounter = function(){
    $("#flagcount").text(lax.getSelectionCount()+" of "+lax.getImagesInViewCount() + " selected");
  };

  var renderImages = function(){
    $("#resultview figure").remove("figure");
    var images = lax.getImages();
    images.forEach(function(element){
      //element = JSON.parse(element);
      var item = {id: element, name: element};
      $($.render(imagetemplate, item)).appendTo(resultview);
    });

    $("figure button").click(function(){
      $(this).parent().toggleClass("marked");
      if($(this).parent().hasClass("marked")){
        $(this).text("unflag");
        lax.selectImage($(this).parent().children().first().attr("id"));
      }else{
        $(this).text("flag");
        lax.deselectImage($(this).parent().children().first().attr("id"));
      }
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

    $("#tagcloud .tag span").click(function(e){
      lax.addTagToQuery($(this).text());
    });


    $(".tag button").click(function(e){
      lax.removeTagFromQuery($(this).parent().children().first().text());
    });

  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var tagtemplate = $("[type='html/tag']").html();

  var resultview = $("#resultview");
  var tagcloudview = $("#tagcloud");
  var querybox = $("#query");


  $("footer#result button#deselect").click(function(){
      $("figure").removeClass("marked");
      $("figure button").text("flag");
      lax.deselectAll();
  });
  $("footer#result button#select").click(function(){
      $("figure").addClass("marked");
      $("figure button").text("unflag");
      lax.selectAll();
  });


  lax.on("change", function() {
    console.log("change event!");
    renderImages();
    renderTags();
  });

  lax.on("selectchange change", function(){
    updateCounter();
  });

  lax.initDB();


  /* Listen to user events */

/*  $("figure").mouseenter(function() {
    $("button", this).fadeIn();
    $("figcaption", this).fadeIn();
  });

  $("figure").mouseleave(function() {
    $("button", this).fadeOut(0);
    $("figcaption", this).fadeOut(0);
  });
*/
  $("#querybox button").click(function(){
    lax.resetQuery();
  });







})();
