
/* The presenter */

(function() { 'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */

  var updateCounter = function(){
    $("#flagcount").text(lax.getSelectionCount()+" of "+lax.getImagesInViewCount() + " selected");

    if(lax.getSelectionCount()>0) $("#edit").show();
    else $("#edit").hide();

  };


  var updateButtonStatus = function(){
    if(lax.isEditMode())
      $("#select, #deselect, #flagbutton").attr("disabled", "disabled");
    else
      $("#select, #deselect, #flagbutton").removeAttr("disabled");
  };

  var renderImages = function(){
    lhsview.empty();
    $($.render(resulttemplate)).appendTo(lhsview);

    var resultview = $("#resultview");

    //$("#resultview figure").remove("figure");
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
    lhsview.empty();
    $("#resultview figure").remove("figure");
    var image = lax.getDetailImage();
    var item = {name: image};
    $($.render(detailtemplate, item)).appendTo(lhsview);

    $("#close").click(function(){
      renderImages();
      lax.deselectAll();
      lax.deactivateEditMode();
    });

    $("#next").click(function(){
      lax.nextImage();
    });

    $("#previous").click(function(){
      lax.previousImage();
    });

    lax.deselectAll();
    lax.selectImage(image);
    lax.activateEditMode();
  };

  var renderBox = function(list, node){
    list.forEach(function(element){
      var item = {size: "small", tag: element};
      $($.render(tagtemplate, item)).appendTo(node);
    });
  };

  var changesUnsaved = function(){
    $("h2").append(" <span>unsaved changes</span>");
  };

  var renderRHS = function(){
    if(lax.isEditMode()){
      var editView = new EditView();
      editView.render();
      editView.controlListeners();
    } else{
      var filterView = new FilterView();
      filterView.render();
      filterView.controlListeners();
    }
  };


  window.lax = new Laxaelv();

  // HTML for a single todo item
  var imagetemplate = $("[type='html/tumb']").html();
  var resulttemplate = $("[type='html/result']").html();
  var detailtemplate = $("[type='html/detail']").html();

  var rhsview = $("section#filter");
  var lhsview = $("#lhsview");
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

  $(document).keydown(function( event ) {
    //event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;
    if(event.which == 39){
      lax.nextImage();
    }
    if(event.which == 37){
      lax.previousImage();
    }

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
    renderRHS();
    updateCounter();
    changesUnsaved();
  });

  lax.on("modechange", function(){
    renderRHS();
    updateCounter();
    updateButtonStatus();
  });

  lax.on("typechange", function(){
    console.log("change event!");
    //renderRHS();
  });

  lax.on("detailchange", function(){
    renderDetailView();
    renderRHS();
    updateCounter();
  });

  lax.initDB();

  $("#querybox button").click(function(){
    lax.resetQuery();
  });


})();
