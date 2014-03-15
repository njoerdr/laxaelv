
/* The presenter */

(function() { 'use strict';

  window.lax = new Laxaelv();
  //lax.initDB();
  window.router = new Router();

  var resultView = new ResultView();
  var detailView = new DetailView();
  var infoview = new InfoView();
  var filterView = new FilterView();

  var editView = new EditView();

  var updateCounter = function(){
    if(lax.isEditMode()) {
      $("#counter").text(lax.getSelectionCount() + ' Image(s) affected by changes');
    } else {
      $("#counter").text(lax.getSelectionCount()+" of "+lax.getImagesInViewCount() + " selected");
    }

    if(lax.isDetailMode()) {
      $("#counter").hide();
    } else {
      $("#counter").show();
    }

    if(lax.getSelectionCount()>0) {
      if(!lax.isDetailMode()) {
        $('#editswitch').addClass('activated');
        $('#editswitch').click(function(){
            lax.toggleEditMode();
        });
      }
    } else {
      if(!lax.isDetailMode()) {
        $('#editswitch').removeClass('activated');
        $('#editswitch').unbind('click');
      }
    }
  };

  var renderImages = function(){
    resultView.render();
  };

  var renderDetailView = function(){
    detailView.render();
    detailView.addListener();
  };

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
      //filterView.controlListeners();
    }
  };

  lax.on("change", function() {
    console.log("change event");
    renderRHS();
    renderImages();
    updateCounter();
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
  });

  lax.on("detailrendering", function(){
    console.log('detailrendering event');
    //DetailOverlay.render();
    renderDetailView();
    renderRHS();
    //updateCounter();
  });

  lax.on("searchrendering", function(){
    console.log('searchrendering event');
    renderImages();
    renderRHS();
    updateCounter();
  });

})();
