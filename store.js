
function DB(key) {


  var imageToTagIndex = {};
  var tagToImageIndex = {};


  for(var item in store) {
    // Create mapping from image to tags
    imageToTagIndex[JSON.stringify(store[item].name)] = store[item].tags;

    // Create mapping from tag to images
    var tags = store[item].tags
    for(var i in tags) {
      var tag = JSON.stringify(tags[i]);
      if(tagToImageIndex[tag] === undefined) tagToImageIndex[tag] = [];
      tagToImageIndex[tag].push(store[item].name);
    }
  }

  console.log(imageToTagIndex);
  console.log(tagToImageIndex);

  return {
    getTags: function(name) {
      return imageToTagIndex[JSON.stringify(name)];
    },

    addTag: function(name, tag) {
      // but image needs to be added to tag as well!
      // test for existance of image
      var array = imageToTagIndex[JSON.stringify(name)];
      if(array.indexOf(tag) === -1) array.push(tag);
    }
  };
}