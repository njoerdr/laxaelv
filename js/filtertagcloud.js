/* Filtertagcloud presenter */

function FilterTagcloud(){
    // Templates

    // Functions
    this.render = function(){
        var tagcloudview = $("#tagcloud");
        tagcloudview.empty();
        var tags = lax.getTags();
        tags.forEach(function(tagdata){
            var tag = TagFactory.createTag(tagdata, tagcloudview);
            TagFactory.addToQueryListener(tag);
        });

    };

    // Events

    lax.on("typechange", function(){
      this.render();
    }.bind(this));

    lax.on("querychange", function(){
        this.render();
    }.bind(this));


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
            var tag = TagFactory.createTag(tagdata, querybox);
            TagFactory.addRemoveFromQueryListener(tag);
        });

        //this.searchBoxListeners();
    };

    this.searchBoxListeners = function(){
        $("#searchfield").unbind('keyup');
        $("#searchfield").keyup(function(e){
            if(e.which===13){
                var tagtext = $("#tagcloud").children().first().children().first().text();
                if (tagtext){
                    lax.addTagToQuery(tagtext);
                    lax.setSearchString('');
                    $(this).html('');
                }
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
        $("#searchfield").click(function(){
          if($(this).text()==="+") $(this).html("");
        });

        $("#searchfield").focusout(function(){
          if($(this).text().length===0) $(this).html("+");
        });
    };


    // Events

    lax.on("querychange", function(){
        this.render();
    }.bind(this));
}


