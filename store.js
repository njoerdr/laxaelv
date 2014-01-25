
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

var Index = function() {
  var index = {};

  return {
    /**
     * returns the list of all entries for the specified key.
     */
    lookup: function(key) {
      return index[JSON.stringify(key)];
    },
    /**
     * Adds a value to the specified key in the index.
     * Ensures that no duplicate entries of a value will be added.
     * If the key does not exist it will be created.
     */
    add: function(key, value) {
      var keystring = JSON.stringify(key);
      if(index[keystring] === undefined) index[keystring] = [];
      var array = index[keystring];
      if(array.indexOf(valus) === -1) array.push(valus);
      return;
    },
    /**
     * If only a key is passed the hole entry for the key will be removed.
     * If a second value parameter if passed only the value for the specified key will be removed.
     */
    remove: function(key, value) {
      if(!value) {
        delete index[JSON.stringify(key)];
        return;
      }
      var array = index[JSON.stringify(key)];
      array.splice(array.indexOf(value),1);
      return;
    },
    /**
     * returns a list of all keys in the index.
     */
    list: function() {
      return Object.keys(index);
    }
  };
};