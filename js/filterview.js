/* Filterview presenter */

function FilterView(){
    // Templates
    var filtertemplate = $("[type='html/filter']").html();
    var rhsview = $("section#filter");
    // Elements

    // Functions
    this.render =function(){
        rhsview.empty();

        var filterTagcloud = new FilterTagcloud();
        $($.render(filtertemplate)).appendTo(rhsview);
        filterTagcloud.render();

        var querybox = new Querybox($("#query"));
        querybox.render();
        querybox.searchBoxListeners();
    };

    this.controlListeners = function(){
        $("#tabs button").removeClass("active");

        $("button#edit").click(function(){
            lax.toggleEditMode();
        });

        $(".tab").click(function(){
                $("#tabs button").removeClass("active");
                var type = $(this).text();
                $(this).addClass("active");
                console.log(type);
                lax.setTypeMode(type);
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
}