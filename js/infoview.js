/* Infoview Presenter */

var InfoView = function() {
    // Templates
    var infotemplate = $("[type='html/infoview']").html();
    var rhsview = $("section#filter");

    // Functions
    this.render = function(){
        rhsview.empty();
        $($.render(infotemplate)).appendTo(rhsview);
        $("h3").text(lax.getDetailImage);
        var tags = lax.getDetailImageTags();
        tags.forEach(function(tagname){
            tagdata = {size: "small", tag: tagname, type:"other"};
            var tag = TagFactory.createTag(tagdata, $("#tags"));
            $(tag).click( function(e) {
                var tagtext = $(this).text();
                tagtext = tagtext.slice(0, tagtext.length-1);
                console.log(tagtext);
                lax.addTagsToQuery([tagtext]);
                lax.deselectAll();
            });
        });
    };

    this.addListener = function(){
        $('#editswitch').click(function(){
            lax.toggleEditMode();
        });
    };

    return this;
};
