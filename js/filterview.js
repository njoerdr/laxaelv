/* Filterview presenter */

var FilterView = function(){
    // Templates
    var filtertemplate = $("[type='html/filter']").html();
    var rhsview = $("section#filter");
    // Elements
    var filterTagcloud;
    var querybox;


    // Functions
    this.render =function(){
        rhsview.empty();

        filterTagcloud = new FilterTagcloud();
        $($.render(filtertemplate)).appendTo(rhsview);
        filterTagcloud.render();

        querybox = new Querybox($("#query"));
        querybox.render();
        querybox.searchBoxListeners();
    };

    this.rerender = function(){
        //filterTagcloud.render();
        querybox.render();
        filterTagcloud.render();

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

    return this;

    // Events
    /*lax.on("querychange", function(){
        console.log("query change - woohooooo!");
        this.rerender();
        this.controlListeners();
    }.bind(this));*/
};