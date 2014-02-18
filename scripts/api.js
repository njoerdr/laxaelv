
/* The model */

function Laxaelv() {

  var self = $.observable(this);

  var editMode = false;

  var query = [];
  var imagesInView = [];
  var selection = [];
  var editTags = [];

  var iterator = 0;

  var db;

  var weights = function(taglist){
    var imagecount = db.getTotalImageCount();

    var mapWeight = function(weight){
      if(weight<0.2) return "small";
      if(weight<0.5) return "medium";
      if(weight>=0.5) return "large";
    };

    taglist.forEach(function(element, index){
      var refCount = db.getReferenceCountForTag(element);
      var weight = refCount/imagecount;
      var type = db.getTagType(element);

      var weightclass = mapWeight(weight);
      taglist[index] = {tag:element, weight:weightclass, type:type};
    });

    return taglist;
  };

  self.initDB = function(){
    db = new DataBase();
    /*console.log(db.getImages(["house","pool"]));
    console.log(db.getCommonTags(["00044-konigsberg.jpg"]));
    console.log(db.getCommonTags(["00044-konigsberg.jpg","00045-poolhouse.jpg"]));*/
    console.log(db.getCommonTags(["00044-konigsberg.jpg","00045-poolhouse.jpg","00046-poolhouse.jpg"]));

    self.trigger("change");
  };

  self.getDetailImage = function(){
    console.log(iterator);
    return imagesInView[iterator];
  };

  self.nextImage = function(){
    iterator += 1;
    iterator = Math.min(iterator, imagesInView.length-1);
    self.trigger("detailchange");
  };

  self.previousImage = function(){
    iterator -=1;
    iterator = Math.max(iterator, 0);
    self.trigger("detailchange");
  };

  self.chooseImage = function(image){
    iterator = imagesInView.indexOf(image);
    self.trigger("detailchange");
  };

  self.getImages = function(){
    imagesInView = db.getImages(query);
    return imagesInView;
  };

  self.getTags = function(){
    console.log(imagesInView);
    var tags = db.getCommonTags(imagesInView);
    if(query.length > 0) tags = db.difference(tags, query);
    // Testing type filtering
    console.log(db.getTagsOfType('where',tags));
    return weights(tags);
  };

  self.initEditTagsForSelection = function(){
    editTags = db.getCommonTags(selection, "intersection");
    //return editTags;
  };

  self.getEditTags = function(){
    return editTags;
  };

  self.getTagCloudForSelection = function(){
     var tags = db.getCommonTags();
     console.log(editTags);
     return weights(db.difference(tags, editTags));
  };

  self.getQueryTags = function(){
    return query;
  };

  self.renameTag = function(oldTag, newTag){
    db.rename(oldTag, newTag);
    self.trigger("change");
  };

  self.getSelectionCount = function(){
    return selection.length;
  };

  self.getImagesInViewCount = function(){
    return imagesInView.length;
  };

  self.toggleEditMode = function(){
    editMode = !editMode;
    if(editMode) self.initEditTagsForSelection();
    self.trigger("modechange");
  };

  self.activateEditMode = function(){
    editMode = true;
    console.log("edit on");
    self.initEditTagsForSelection();
    self.trigger("modechange");
  };

  self.deactivateEditMode = function(){
    editMode = false;
    self.trigger("modechange");
  };

  self.isEditMode = function(){
    return editMode;
  };

  self.saveChanges = function(){
    selection.forEach(function(image){
      db.addImage(image, editTags);
    });
    self.toggleEditMode();
  };


  self.addTagToEdit = function(tag){
    editTags.push(tag);
    self.trigger("editchange");
  };

  self.removeTagFromEdit = function(tag){
    editTags.splice(editTags.indexOf(tag), 1);
    self.trigger("editchange");
  };

  self.addTagToQuery = function(tag){
    query.push(tag);
    self.trigger("change");
  };

  self.removeTagFromQuery = function(tag){
    query.splice(query.indexOf(tag), 1);
    self.trigger("change");
  };

  self.resetQuery = function(){
    query = [];
    self.trigger("change");
  };

  self.selectImage = function(image){
    selection.push(image);
    self.trigger("selectchange");
  };

  self.deselectImage = function(image){
    selection.splice(selection.indexOf(image), 1);
    self.trigger("selectchange");
  };

  self.selectAll = function(){
    selection = [];
    for(var image in imagesInView)
      selection.push(imagesInView[image]);
    self.trigger("selectchange");
  };


  self.deselectAll = function(){
    selection = [];
    self.trigger("selectchange");
  };

}