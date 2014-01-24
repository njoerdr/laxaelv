
function DB(key) {


  var imageToTagIndex = store;
  var tagToImageIndex = {};

  store.map(function(element){
    for(var i in element.tags){
        var tag = element.tags[i];
        if(tagToImageIndex[tag]===undefined) tagToImageIndex[tag] = [];
        console.log(element.name);
        tagToImageIndex[tag] = tagToImageIndex[tag].push(element.name);
    }

  });

  console.log(tagToImageIndex);

  return {
    get: function() {
      return JSON.parse(store[key] || '{}');
    },

    put: function(data) {
      store[key] = JSON.stringify(data);
    }
  };
}