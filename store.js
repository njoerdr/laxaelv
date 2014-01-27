
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
    },
    print: function() {
      console.log(index);
    }
  };
};


var DataBase = function() {

  var image2tagIndex = new Index();
  var tag2imageIndex = new Index();

  var init = function() {
    for(var item in store) {
      var key = store[item].name;
      var tags = store[item].tags
      for(var i in tags) {
        image2tagIndex.add(key, tags[i]);
        tag2imageIndex.add(tags[i], key);
      }
    }
  }();
  // for debugging purpose only
  image2tagIndex.print();
  tag2imageIndex.print();

  // private method for intersection of multiple lists
  var intersect = function(listOfLists) {
    return listOfLists.shift().filter(function(v) {
        return listOfLists.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
  };

  return {
    // Images for query passed as list
    getImages: function(/*array or nothing*/ query) {
      // trivial cases
      if(!query) return image2tagIndex.list();
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
    getCommonTags: function(/*array or nothing*/ selection) {
      // trivial cases
      if(!selection) return tag2imageIndex.list();
      if(selection.length === 1) return image2tagIndex.lookup(selection[0]);

      // preparation for intersection
      var arrays = [];
      for(var i in selection) {
        arrays.push(image2tagIndex.lookup(selection[i]));
      }
      // intersection
      return intersect(arrays);
    },
    getTotalTagCount: function(tag) {
      return tag2imageIndex.lookup(tag).length;
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
    }
    /** Stuff needed:
      * Difference of two or more sets of tags, e.g. tags not assignd.
      * Common tags minus query tags
      * All tags minus selection common tags
    */
  };
};