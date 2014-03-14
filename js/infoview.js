/* Infoview Presenter */

var InfoView = function() {
    // Templates
    var infotemplate = $("[type='html/infoview']").html();
    var rhsview = $("section#filter");

    // Functions
    this.render = function(){
        rhsview.empty();
        $($.render(infotemplate)).appendTo(rhsview);
        $("h3").text('File: ' + lax.getDetailImage());
        var tags = lax.getDetailImageTags();
        tags.forEach(function(tagname){
            tagdata = {size: "small", tag: tagname, type:"other"};
            var tag = TagFactory.createTag(tagdata, $("#tags"));
            TagFactory.addSearchListener(tag);
        });
    };

    this.addListener = function(){
        $('#editswitch').click(function(){
            lax.toggleEditMode();
        });
    };

    return this;
};
