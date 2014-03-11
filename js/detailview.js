/* Detailview Presenter */

var DetailView = function() {

    var detailtemplate = $("[type='html/detail']").html();
    var lhsview = $("#lhsview");

    var active = false;

    var deactivate = function() {
        // TODO Promblematic
        lax.deselectAll();
        lax.deactivateEditMode();
        active = false;
    };

    this.render = function() {
        lhsview.empty();
        // TODO Promblematic
        lax.deselectAll();
        var image = lax.getDetailImage();
        var item = {name: image};
        $($.render(detailtemplate, item)).appendTo(lhsview);
        // TODO Promblematic
        lax.selectImage(image);
        active = true;
    };

    this.addListener = function(){
        $("#close").click(function(){
           deactivate();
        });

        $("#next").click(function(){
           lax.nextImage();
        });

        $("#previous").click(function(){
           lax.previousImage();
        });
        $(document).keyup(function(event) {
            if(active) {
                event.stopImmediatePropagation();
                //event.cancelBubble = true;
                //event.returnValue = false;
                if(event.which == 39){
                    console.log('BUTTON');
                  lax.nextImage();
                }
                if(event.which == 37){
                  lax.previousImage();
                }
                if(event.which == 27){
                  deactivate();
                }
            }
        });
    };

    return this;

};