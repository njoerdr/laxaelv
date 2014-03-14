/* Editview presenter */

function EditView(){
    // Templates
    var edittemplate = $("[type='html/edit']").html();
    var rhsview = $("section#filter");

    var editbox = new Editbox();

    // Functions
    this.render =function(){
        var editTagcloud = new EditTagcloud();
        rhsview.empty();
        $($.render(edittemplate)).appendTo(rhsview);
        editTagcloud.render();

        editbox.render();
        editbox.searchBoxListeners();
        if(lax.isDetailMode()) {
            $("#searchswitch>h2").text("Details");
        }
    };

    this.controlListeners = function(){

        $("#searchswitch").click(function(){
            lax.toggleEditMode();
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
}