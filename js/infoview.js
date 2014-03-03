/* Infoview Presenter */

function InfoView(){
    // Templates
    var infotemplate = $("[type='html/infoview']").html();
    var rhsview = $("section#filter");

    // Elements
    var domElement;

    // Functions
    this.render = function(){
        rhsview.empty();
        domElement = $($.render(infotemplate)).appendTo(rhsview);
        domElement = domElement[0];
        $("h2").text(lax.getDetailImage);
        var tags = lax.getDetailImageTags();
        tags.forEach(function(tagname){
            tagdata = {size: "small", tag: tagname, type:"other"};
            var tag = new Tag(tagdata, $("#tags"));
            tag.render();
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
