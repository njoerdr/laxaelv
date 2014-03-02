/* Tagcloud presenter */

function FilterTagcloud(){
    // Templates

    // Elements
    var tagcloudview = $("#tagcloud");

    var tagviews = [];
    var querybox;
    // Events


    // Functions
    this.render = function(){
        tagcloudview.empty();
        var tags = lax.getTags();

        tags.forEach(function(tagdata){
            var tag = new Tag(tagdata, tagcloudview);
            tagviews.push(tag);
            tag.render();
            tag.addToQueryListener();
        });

        querybox = new Querybox();
        querybox.render();

        $("#tabs button").removeClass("active");
        $("#tabs button."+lax.getTypeMode()).addClass("active");
        $(".tab").click(function(){
            var type = $(this).text();
            lax.setTypeMode(type);
        });
    };
}


/* Tag presener */

function Tag(tagdata, parentElement){
    // Templates
    var tagtemplate = $("[type='html/tag']").html();
    var domElement;

    // Functions
    this.render = function(){
        var item = {size: tagdata.weight, tag: tagdata.tag, type:tagdata.type};
        domElement = $($.render(tagtemplate, item)).appendTo(parentElement);
        domElement = domElement[0];
    };

    this.addToQueryListener = function(){
        $(domElement).children().first().click(function(e){
            var tagtext = $(this).text();
            lax.addTagToQuery(tagtext);
        });
    };

    this.addRemoveFromQueryListener = function(){
        $(domElement).children().last().click(function(e){
            var tagtext = $(this).parent().children().first().text();
            lax.removeTagFromQuery(tagtext);
        });
    };

}

/* Querybox presenter */

function Querybox(){

    // Elements
    var querybox = $("#query");

    var tagviews = [];

    // Functions
    this.render = function(){
        querybox.empty();
        var taglist = lax.getQueryTags();
        taglist.forEach(function(element){
            var tagdata = {size: "small", tag: element};
            var tag = new Tag(tagdata, querybox);
            tagviews.push(tag);
            tag.render();
            tag.addRemoveFromQueryListener();
        });
    };
}


