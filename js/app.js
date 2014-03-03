
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
    var resultView = new ResultView();
    resultView.render();
  };

  var renderDetailView = function(){
    var detailview = new DetailView();
    detailview.render();
    detailview.addControlListiner();

    var infoview = new InfoView();
    infoview.render();
    infoview.addListener();
    /*lax.deselectAll();
    lax.selectImage(image);
    lax.activateEditMode();*/
  };

  var renderRHS = function(){
    if(lax.isEditMode()){
      var editView = new EditView();
      editView.render();
      editView.controlListeners();
    } else{
      $("body").removeClass('editmode');
      var filterView = new FilterView();
      filterView.render();
      filterView.controlListeners();
    }
  };


  window.lax = new Laxaelv();
  window.router = new Router();

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
    updateCounter();
    //changeRoute();
  });

  lax.on("modechange", function(){
    renderRHS();
    updateCounter();
    updateButtonStatus();

  });


  lax.on("detailchange", function(){
    renderDetailView();
    updateCounter();
  });

  lax.initDB();

  $("#querybox button").click(function(){
    lax.resetQuery();
  });


})();
