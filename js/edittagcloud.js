/* Edittagcloud presenter */

function EditTagcloud(){
    // Templates
    var infotemplate = $("[type='html/info']").html();

    // Elements
    var tagcloudview = $("#tagcloud");

    var tagviews = [];
    var editbox;

    // Functions
    this.render = function(){
        tagcloudview = $("#tagcloud");
        tagcloudview.empty();
        var tags = lax.getTagCloudForSelection();
        if(tags.length===0)
            $($.render(infotemplate)).appendTo(tagcloudview);
        tags.forEach(function(tagdata){
            var tag = new Tag(tagdata, tagcloudview);
            tagviews.push(tag);
            tag.render();
            tag.addToEditListener();
        });

        $("#tabs button").removeClass("active");
        $("#tabs button."+lax.getTypeMode()).addClass("active");
        $(".tab").click(function(){
            var type = $(this).text();
            lax.setTypeMode(type);
        });
    };

    // Events
    lax.on("typechange", function(){
      this.render();
    }.bind(this));

}

/* Editbox presenter */

function Editbox(appendTo){

    // Elements
    var querybox = appendTo;

    var tagviews = [];

    // Functions
    this.render = function(){
        querybox.empty();
        var taglist = lax.getEditTags();
        taglist.forEach(function(element){
            var tagdata = {size: "small", tag: element};
            var tag = new Tag(tagdata, querybox);
            tagviews.push(tag);
            tag.render();
            tag.addDeleteTagListener();
        });
    };


    this.searchBoxListeners = function(){
        $("#searchfield").unbind('keyup');
        $("#searchfield").keyup(function(e){
            if(e.which===13){
                var tagtext = $("#tagcloud").children().first().children().first().text();
                if (tagtext) lax.addTagToEdit(tagtext);
                else lax.addTagToEdit($(this).text());
                return false;
            }
            var text = $("#searchfield").text();
            lax.setSearchString(text);
            $(this).attr("size", text.length);
            return true;
        });

        $("#searchfield").click(function(){
          if($(this).text()==="+") $(this).html("");
        });

        $("#searchfield").focusout(function(){
          if($(this).text().length===0) $(this).html("+");
        });
    };
}





