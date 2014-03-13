
/* The presenter */

(function() { 'use strict';

  window.lax = new Laxaelv();
  window.router = new Router();

  var resultView = new ResultView();
  var detailView = new DetailView();
  var infoview = new InfoView();
  var filterView = new FilterView();

  var editView = new EditView();

  var updateCounter = function(){
    $("#flagcount").text(lax.getSelectionCount()+" of "+lax.getImagesInViewCount() + " selected");

    if(lax.getSelectionCount()>0) 
      $("#edit").show();
    else 
      $("#edit").hide();

  };


  var updateButtonStatus = function(){
    if(lax.isEditMode())
      $("#select, #deselect, #flagbutton").attr("disabled", "disabled");
    else
      $("#select, #deselect, #flagbutton").removeAttr("disabled");
  };

  var renderImages = function(){
    resultView.render();
  };

  var renderDetailView = function(){
    detailView.render();
    detailView.addListener();
    
    //infoview.render();
    //infoview.addListener();
  };
  /*
  var renderLHS = function() {
    if(lax.isDetailMode()) {
      detailView.render();
      detailView.addListener();
    } else {
      resultView.render();
    }
  };
  */
  var renderRHS = function() {
    if(lax.isEditMode()) {
      $("body").addClass('editmode');
      editView.render();
      editView.controlListeners();
    } else if(lax.isDetailMode()) {
      $("body").removeClass('editmode');
      infoview.render();
      infoview.addListener();
    } else {
      $("body").removeClass('editmode');
      filterView.render();
      filterView.controlListeners();
    }
  };

  // HTML for a single todo item
  /*
  var imagetemplate = $("[type='html/tumb']").html();
  var resulttemplate = $("[type='html/result']").html();
  var detailtemplate = $("[type='html/detail']").html();

  var rhsview = $("section#filter");
  var lhsview = $("#lhsview");
  var tagcloudview = $("#tagcloud");
  var querybox = $("#query");
  var editbox = $("#tagselection");
  */


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
    console.log("change event");
    renderRHS();
    renderImages();
    updateCounter();
    //renderTags();
  });

  lax.on("selectchange", function(){
    console.log('selectchange event');
    updateCounter();
  });

  lax.on("editchange", function(){
    console.log('editchange event');
    //updateCounter();
    //changeRoute();
  });

  lax.on("querychange", function(){
    console.log('querychange event');
    updateCounter();
  });

  lax.on("modechange", function(){
    console.log('modechange event');
    renderRHS();
    updateCounter();
    updateButtonStatus();

  });

  lax.on("detailrendering", function(){
    console.log('detailchange event');
    //DetailOverlay.render();
    renderDetailView();
    renderRHS();
    //updateCounter();
  });

  lax.initDB();

  $("#querybox button").click(function(){
    lax.resetQuery();
  });


})();
