/* Infoview Presenter */

function InfoView(){
    // Templates
    var infotemplate = $("[type='html/infoview']").html();
    var rhsview = $("section#filter");

    // Functions
    this.render = function(){
        rhsview.empty();
        $($.render(infotemplate)).appendTo(rhsview);
        $("h2").text(lax.getDetailImage);
        var tags = lax.getDetailImageTags();
        tags.forEach(function(tagname){
            tagdata = {size: "small", tag: tagname, type:"other"};
            var tag = TagFactory.createTag(tagdata, $("#tags"));
        });
    };

    this.addListener = function(){
        $("#tags").children().click(function(e){
            var tagtext = $(this).text();
            tagtext = tagtext.slice(0, tagtext.length-1);
            console.log(tagtext);
            lax.addTagsToQuery([tagtext]);
            lax.deselectAll();
            lax.deactivateEditMode();
        });

        $("button#edit").click(function(){
            lax.toggleEditMode();
        });
    };
}
