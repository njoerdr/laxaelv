/* Filtertagcloud presenter */

function FilterTagcloud(){

    var template = $("[type='html/empty']").html();

    this.render = function(){
        var tagcloudview = $("#tagcloud");
        tagcloudview.empty();
        var tags = lax.getTags();
        tags.forEach(function(tagdata){
            var tag = TagFactory.createTag(tagdata, tagcloudview);
            //TagFactory.unbindAll(tag);
            TagFactory.addToQueryListener(tag);
        });
        
        if(tags.length === 0) {
            $($.render(template)).appendTo(tagcloudview);
        }

        var type = lax.getTypeMode();
        $('.tab').each(function(){
            $(this).toggleClass('active', $(this).hasClass(type));
        });
    };

    this.controlListeners = function(){
        $("button#deselect").click(function(e){
            e.stopImmediatePropagation();
            $("figure").removeClass("marked");
            lax.deselectAll();
        });
        $("button#select").click(function(e){
            e.stopImmediatePropagation();
            $("figure").addClass("marked");
            lax.selectAll();
        });

        $(".tab").click(function(){
            var type = $(this).text();
            lax.setTypeMode(type);
        });

        $(".tab").droppable({
            hoverClass: "drophover",
            activeClass: "droptarget",
            drop: function( event, ui ) {
                var tagtext = ui.draggable.children().first().text();
                var typetext = $(this).text();
                if(typetext==="all") return;
                lax.changeTagType(tagtext, typetext);
            }
        });
    };

    lax.on("typechange", function(){
        this.render();
    }.bind(this));
    /*
    lax.on("querychange", function(){
        this.render();
    }.bind(this));
    */
    return this;
}

/* Querybox presenter */

function Querybox(queryboxId){

    var self = this;
    var id = queryboxId.toString();

    this.render = function(){
        var querybox = $('#'+id+' .query');
        querybox.empty();
        var taglist = lax.getSubquery(queryboxId);
        taglist.forEach(function(element){
            var tagdata = {size: "small", tag: element};
            var tag = TagFactory.createTag(tagdata, querybox);
            TagFactory.addRemoveFromQueryListener(tag, queryboxId);
        });
        $('.querybox').removeClass('focus');
        if(lax.hasQueryFocus(queryboxId)){
            $('#'+id+ ' .searchfield').focus();
            $('#'+id).addClass('focus');
        } else {
            $('#'+id+ ' .searchfield').hide();
        }
        $('button.plus').hide();
        $('button.plus').last().show();
        $('.querybox').removeClass('last');
        $('.querybox').last().addClass('last');
    };

    this.searchBoxListeners = function(){
        $('#'+id+ ' .searchfield').unbind('keyup');
        $('#'+id+ ' .searchfield').keyup(function(e){
            if(e.which===13) {
                var tagtext = $("#tagcloud").children().first().children().first().text();
                if (tagtext){
                    lax.addTagToQuery(tagtext);
                }
                lax.setSearchString('');
                $(this).html('');
                return false;
            }
            var text = $('#'+id+ ' .searchfield').text();
            lax.setSearchString(text);
            $(this).attr("size", text.length);
            return true;
        });

        $('#'+id+ ' > div:first').click(function(e){
            e.stopImmediatePropagation();
            $('#'+id+ ' .searchfield').show();
            $('#'+id+ ' .searchfield').focus();
            $('.querybox').removeClass('focus');
            $('#'+id).addClass('focus');
            lax.setQueryFocus(queryboxId);
        });

        $('#'+id+ ' .searchfield').focusout(function(e){
            e.stopImmediatePropagation();
            $(this).html("");
            $(this).hide();
            //$('#'+id).removeClass('focus');
        });

        $('#'+id+ ' button.clear').click(function(){
            lax.resetQuery(queryboxId);
        });

        $('#'+id+ ' button.plus').click(function(){
            var newId = lax.addSubquery();
            var querytemplate = $("[type='html/querybox']").html();
            $($.render(querytemplate, {id:newId})).insertBefore($('#tagcloud'));
            var querybox = new Querybox(newId);
            querybox.render();
            querybox.searchBoxListeners();
        });

    };
    /*
    lax.on("querychange", function(){
        this.render();
    }.bind(this));
    */
    return this;
}

