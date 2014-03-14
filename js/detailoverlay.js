/* Detailview Presenter */

var DetailOverlay = function(){

    var attached = false;

    var show = function() {
        var image = lax.getDetailImage();
        $('#detailimg').attr('src', 'photos/' + image);
        $('#details h2').text(image);
        var tags = lax.getDetailImageTags();
        $("#tags").empty();
        tags.forEach(function(tagname){
            tagdata = {size: "small", tag: tagname, type:"other"};
            var tag = TagFactory.createTag(tagdata, $("#tags"));
            $(tag).click( function(e) {
                var tagtext = $(this).text();
                tagtext = tagtext.slice(0, tagtext.length-1);
                console.log(tagtext);
                lax.addTagsToQuery([tagtext]);
                lax.deselectAll();
                remove();
            });
        });
    };

    var remove = function() {
        $('#details').remove();
        lax.deactivateEditMode();
        attached = false;
    };

    this.render = function() {
        if(!attached) {
            var overlay = $("[type='html/details']").html();
            var rootNode = $('#laxaelvapp');
            $($.render(overlay)).appendTo(rootNode);
            $("#close").click(function(){
               remove();
            });
            $("#next").click(function(){
               lax.nextImage();
               //show();
            });
            $("#previous").click(function(){
               lax.previousImage();
               //show();
            });
            $(document).keydown(function(event) {
                if(attached) {
                    event.cancelBubble = true;
                    event.returnValue = false;
                    if(event.which == 39){
                      lax.nextImage();
                      //show();
                    }
                    if(event.which == 37){
                      lax.previousImage();
                      //show();
                    }
                    if(event.which == 27){
                      remove();
                    }
                }
            });
            attached = true;
        }

        show();
    };
    return this;
};