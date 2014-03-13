/* Edittagcloud presenter */

function EditTagcloud(){

    this.render = function(){
        var tagcloudview = $("#tagcloud");
        tagcloudview.empty();
        var tags = lax.getTagCloudForSelection();
        if(tags.length===0) {
            var infotemplate = $("[type='html/info']").html();
            $($.render(infotemplate)).appendTo(tagcloudview);
        }
        tags.forEach(function(tagdata){
            var tag = TagFactory.createTag(tagdata, tagcloudview);
            TagFactory.addToEditListener(tag);
        });

        $("#tabs button").removeClass("active");
        $("#tabs button."+lax.getTypeMode()).addClass("active");
        $(".tab").click(function(){
            var type = $(this).text();
            lax.setTypeMode(type);
        });
    };

    this.changesunsaved = function(){
        $("h2 span").remove();
        $("h2").append(" <span>unsaved changes</span>");
    };

    lax.on("typechange", function(){
        this.render();
    }.bind(this));

    lax.on("editchange", function(){
        this.render();
        this.changesunsaved();
    }.bind(this));

    return this;
}

/* Editbox presenter */

function Editbox(){

    // Functions
    this.render = function(){
        var querybox = $("#selection");
        querybox.empty();
        var taglist = lax.getEditTags();
        taglist.forEach(function(element){
            var tagdata = {size: "small", tag: element};
            var tag = TagFactory.createTag(tagdata, querybox);
            TagFactory.addDeleteTagListener(tag);
        });
    };

    this.searchBoxListeners = function(){
        $("#searchfield").unbind('keyup');
        $("#searchfield").keyup(function(e){
            if(e.which===13){
                var tagtext = $("#tagcloud").children().first().children().first().text();
                if (tagtext) {
                    lax.saveTag(tagtext);  
                } else {
                    lax.saveTag($(this).text());
                } 
                lax.setSearchString('');
                $(this).html('');
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

    lax.on("editchange", function(){
        this.render();
    }.bind(this));

    return this;
}

