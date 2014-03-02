/* Filtertagcloud presenter */

function FilterTagcloud(){
    // Templates

    // Elements
    var tagcloudview = $("#tagcloud");

    var tagviews = [];
    var querybox;

    // Functions
    this.render = function(){
        tagcloudview = $("#tagcloud");
        tagcloudview.empty();
        var tags = lax.getTags();
        tags.forEach(function(tagdata){
            var tag = new Tag(tagdata, tagcloudview);
            tagviews.push(tag);
            tag.render();
            tag.addToQueryListener();
        });

    };

    // Events

    lax.on("typechange", function(){
      this.render();
    }.bind(this));


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
        $(domElement).draggable({ stack: ".tag" });
    };

    this.addToQueryListener = function(){
        $(domElement).children().first().click(function(e){
            var tagtext = $(this).text();
            lax.addTagToQuery(tagtext);
        });
    };

    this.addToEditListener = function(){
        $(domElement).children().first().click(function(e){
            var tagtext = $(this).text();
            lax.addTagToEdit(tagtext);
        });
    };

    this.addRemoveFromQueryListener = function(){
        $(domElement).children().last().click(function(e){
            var tagtext = $(this).parent().children().first().text();
            lax.removeTagFromQuery(tagtext);
        });
    };

    this.addDeleteTagListener = function(){
        $(domElement).children().last().click(function(e){
            var tagtext = $(this).parent().children().first().text();
            lax.removeTagFromEdit(tagtext);
        });
    };

}

/* Querybox presenter */

function Querybox(appendTo){

    // Elements
    var querybox = appendTo;

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

        //this.searchBoxListeners();
    };

    this.searchBoxListeners = function(){
        $("#searchfield").unbind('keyup');
        $("#searchfield").keyup(function(e){
            if(e.which===13){
                var tagtext = $("#tagcloud").children().first().children().first().text();
                if (tagtext)
                    lax.addTagToQuery(tagtext);
                else{
                    lax.setSearchString('');
                    $(this).html('');
                }

                return false;
            }
            var text = $("#searchfield").text();
            lax.setSearchString(text);
            $(this).attr("size", text.length);
            //return true;
        });
    };

    $("#searchfield").click(function(){
      if($(this).text()==="+") $(this).html("");
    });

    $("#searchfield").focusout(function(){
      if($(this).text().length===0) $(this).html("+");
    });


}


