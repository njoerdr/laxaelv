
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */

  var edit = false;

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

  var renderBox = function(list, node){
    list.forEach(function(element){
      var item = {size: "small", tag: element};
      $($.render(tagtemplate, item)).appendTo(node);
    });
  };

  var renderTags = function(){
    $("#tagcloud").empty();
    if(edit) editbox.empty();
    else $("#query").empty();

    var tags = lax.getTags();
    if(edit) tags = lax.getTagCloudForSelection();
    console.log(tags);
    tags.forEach(function(element){
      var item = {size: element.weight, tag: element.tag};
      $($.render(tagtemplate, item)).appendTo(tagcloudview);
    });

    if(edit) renderBox(lax.getEditTags(), editbox);
    else renderBox(lax.getQueryTags(), querybox);

    $("#tagcloud .tag span").click(function(e){
      var tagtext = $(this).text();
      if(edit) lax.addTagToEdit(tagtext);
      else lax.addTagToQuery(tagtext);
    });


    $(".tag button").click(function(e){
      var tagtext = $(this).parent().children().first().text();
      if(edit) lax.removeTagFromEdit(tagtext);
      else lax.removeTagFromQuery(tagtext);
    });

  };

  var renderRHS = function(){
    rhsview.empty();
    if(edit){
      $($.render(edittemplate)).appendTo(rhsview);
      editbox = $("#tagselection");
    } else {
      $($.render(filtertemplate)).appendTo(rhsview);
      querybox = $("#query");
    }
    tagcloudview = $("#tagcloud");
    renderTags();

    $("button#edit").click(function(){
      edit = true;
      lax.initEditTagsForSelection();
      renderRHS();

    });

     $("button#cancel").click(function(){
      edit = false;
      renderRHS();
    });
  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var tagtemplate = $("[type='html/tag']").html();
  var filtertemplate = $("[type='html/filter']").html();
  var edittemplate = $("[type='html/edit']").html();

  var rhsview = $("section#filter");
  var resultview = $("#resultview");
  var tagcloudview = $("#tagcloud");
  var querybox = $("#query");
  var editbox = $("#tagselection");



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
    renderRHS();
    //renderTags();
  });

  lax.on("selectchange change", function(){
    updateCounter();
  });

  lax.on("editchange", function(){
    console.log("editchange");
    renderTags();
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
