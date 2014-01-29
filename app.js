
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


  var updateButtonStatus = function(){
    if(lax.isEditMode())
      $("#select, #deselect, figure button").attr("disabled", "disabled");
    else
      $("#select, #deselect, figure button").removeAttr("disabled");
  };

  var renderImages = function(){
    $("#resultview figure").remove("figure");
    var images = lax.getImages();
    images.forEach(function(element){
      //element = JSON.parse(element);
      var item = {id: element, name: element};
      $($.render(imagetemplate, item)).appendTo(resultview);
    });

    $("figure img").click(function(){
      var image = $(this).attr("id");
      lax.chooseImage(image);
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

  var renderDetailView = function(){
    $("#resultview figure").remove("figure");
    var image = lax.getDetailImage();
    var item = {name: image};
    $($.render(detailtemplate, item)).appendTo(resultview);
  };

  var renderBox = function(list, node){
    list.forEach(function(element){
      var item = {size: "small", tag: element};
      $($.render(tagtemplate, item)).appendTo(node);
    });
  };

  var renderTags = function(){
    $("#tagcloud").empty();
    if(lax.isEditMode()) editbox.empty();
    else $("#query").empty();

    var tags = lax.getTags();
    if(lax.isEditMode()) tags = lax.getTagCloudForSelection();
    console.log(tags);
    tags.forEach(function(element){
      var item = {size: element.weight, tag: element.tag};
      $($.render(tagtemplate, item)).appendTo(tagcloudview);
    });

    if(lax.isEditMode()) renderBox(lax.getEditTags(), editbox);
    else renderBox(lax.getQueryTags(), querybox);

    $("#tagcloud .tag span").click(function(e){
      var tagtext = $(this).text();
      if(lax.isEditMode()) lax.addTagToEdit(tagtext);
      else lax.addTagToQuery(tagtext);
    });


    $(".tag button").click(function(e){
      var tagtext = $(this).parent().children().first().text();
      if(lax.isEditMode()) lax.removeTagFromEdit(tagtext);
      else lax.removeTagFromQuery(tagtext);
    });

  };

  var renderRHS = function(){
    rhsview.empty();
    if(lax.isEditMode()){
      $($.render(edittemplate)).appendTo(rhsview);
      editbox = $("#tagselection");
    } else {
      $($.render(filtertemplate)).appendTo(rhsview);
      querybox = $("#query");

      $("#querybox button").click(function(){
        lax.resetQuery();
      });
    }
    tagcloudview = $("#tagcloud");
    renderTags();

    $("button#edit").click(function(){
      lax.toggleEditMode();
    });

    $("button#cancel").click(function(){
      lax.toggleEditMode();
    });

    $("button#save").click(function(){
      lax.saveChanges();
    });
  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var tagtemplate = $("[type='html/tag']").html();
  var filtertemplate = $("[type='html/filter']").html();
  var edittemplate = $("[type='html/edit']").html();
  var detailtemplate = $("[type='html/detail']").html();

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

  lax.on("modechange", function(){
    renderRHS();
    updateCounter();
    updateButtonStatus();
  });

  lax.on("detailchange", function(){
    renderDetailView();
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
