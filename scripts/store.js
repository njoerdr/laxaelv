
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
      if(array.indexOf(value) === -1) array.push(value);
      return;
    },
    /**
     * Renames the value given by oldValue
     * into newValue in the entry specified by key.
     */
    renameValue: function(key, oldValue, newValue) {
      var keystring = JSON.stringify(key);
      //index.splice(index[keystring].indexOf(oldValue),1,newValue);
      index[keystring][index[keystring].indexOf(oldValue)] = newValue;
      return;
    },
    /**
     * Renames the key of the entry oldKey into newKey.
     * Returns undefined in case the newKey already exists.
     */
    renameKey: function(oldKey, newKey) {
      var okeystr = JSON.stringify(oldKey);
      var nkeystr = JSON.stringify(newKey);
      if(index[nkeystr] === undefined) {
        index[nkeystr] = index[okeystr];
        delete index[okeystr];
        return index[nkeystr];
      }
      return undefined;
    },
    /*
    set: function(key, values) {
      var keystring = JSON.stringify(key);
      index[keystring] = values;
      return;
    },
    */
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
      return Object.keys(index).map(function(element){
        return JSON.parse(element);
      });
    },
    print: function() {
      console.log(index);
    }
  };
};


var DataBase = function() {

  var image2tagIndex = new Index();
  var tag2imageIndex = new Index();

  var tag2typeIndex = new Index();
  var type2tagIndex = new Index();

  var init = function() {
    // building type index
    for(var item in types) {
      var type = types[item].type;
      var tags = types[item].tags;
      for(var i in tags) {
        type2tagIndex.add(type, tags[i]);
        tag2typeIndex.add(tags[i], type);
      }
    }
    // building image index
    for(var item in store) {
      var key = store[item].name;
      var tags = store[item].tags;
      for(var i in tags) {
        image2tagIndex.add(key, tags[i]);
        tag2imageIndex.add(tags[i], key);
        // taking care of untyped tags
        if(!tag2typeIndex.lookup(tags[i]))
          type2tagIndex.add("other", tags[i]);
      }
    }
  }();
  // for debugging purpose only
  image2tagIndex.print();
  tag2imageIndex.print();

  type2tagIndex.print();
  tag2typeIndex.print();


  // private method for intersection of multiple lists
  var intersect = function(listOfLists) {
    return listOfLists.shift().filter(function(v) {
        return listOfLists.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
  };

  // private method for union of multiple lists
  var union = function(listOfLists) {

    var result = [];

    listOfLists.forEach(function(a) {
        a.forEach(function(b){
          if(result.indexOf(b) === -1) result.push(b);
        });
    });
    return result;
  };

  return {
    // Images for query passed as list
    getImages: function(/*array or nothing*/ query) {
      // trivial cases
      if(!query || query.length === 0) return image2tagIndex.list();
      if(query.length === 1) return tag2imageIndex.lookup(query[0]);

      // preparation for intersection
      var arrays = [];
      for(var i in query) {
        arrays.push(tag2imageIndex.lookup(query[i]));
      }
      // intersection
      return intersect(arrays);
    },
    // Tags for selection passed as list
    getCommonTags: function(/*array or nothing*/ selection, /*intersection or union=default*/ operation) {
      // trivial cases
      if(!selection || selection.length === 0) return tag2imageIndex.list();
      if(selection.length === 1) return image2tagIndex.lookup(selection[0]);

      // preparation for intersection
      var arrays = [];
      for(var i in selection) {
        arrays.push(image2tagIndex.lookup(selection[i]));
      }
      if(operation==="intersection") return intersect(arrays);

      return union(arrays);
    },
    getReferenceCountForTag: function(tag) {
      return tag2imageIndex.lookup(tag).length;
    },
    getTotalImageCount: function() {
      return image2tagIndex.list().length;
    },
    getTagType: function(tag) {
      var result = tag2typeIndex.lookup(tag);
      if(!result) return "other";
      return result[0];
    },
    getTagsForType: function(type) {
      return type2tagIndex.lookup(type);

    },
    // Adds a new images name to the index and its tags passed as list
    addImage: function(name, /*array*/ tags) {
      tags.forEach(function(value, index, array) {
        image2tagIndex.add(name, value);
        tag2imageIndex.add(value, name);
      });
    },
    // Adds a new tag to the index and its associated images passed as list
    addTag: function(tag, /*array*/ names) {
      tags.forEach(function(value, index, array) {
        tag2imageIndex.add(tag, value);
        image2tagIndex.add(value, tag);
      });
    },
    difference: function(listOne, listTwo) {
      return listOne.filter(function(v){
          return listTwo.indexOf(v) === -1;
      });
    },
    // Renames the tag with a new tagname
    rename : function(oldTag, newTag){
      console.log("rename");
      var images = tag2imageIndex.renameKey(oldTag, newTag);
      /*
      for(var i in tag2imageIndex.lookup(oldTag) ){
        tag2imageIndex.add(newTag, tag2imageIndex.lookup(oldTag)[i]);
      }
      tag2imageIndex.set(oldTag, []);
      */
      tag2imageIndex.print();
      if(!images)
        return console.log("Can't rename, since key already exists.");
      images.forEach(function(name) {
        image2tagIndex.renameValue(name, oldTag, newTag);
      });
      /*
      imagesToChange = tag2imageIndex.lookup(newTag);
      for(var j in imagesToChange){
        console.log(imagesToChange[j]);
        tagsForImage = image2tagIndex.lookup(imagesToChange[j]);
        var position = tagsForImage.indexOf(oldTag);
        tagsForImage[position] = newTag;
        image2tagIndex.set(imagesToChange[j],tagsForImage);
      }
      */
      image2tagIndex.print();
      return;
    }
    /** Stuff needed:
      * Difference of two or more sets of tags, e.g. tags not assignd.
      * Common tags minus query tags
      * All tags minus selection common tags
    */
  };
};