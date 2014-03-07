/* Detailview Presenter */

function DetailView(){
    // Templates
    var detailtemplate = $("[type='html/detail']").html();
    var lhsview = $("#lhsview");
    // Elements

    // Functions

    this.render = function(){
        lhsview.empty();
        var image = lax.getDetailImage();
        var item = {name: image};
        $($.render(detailtemplate, item)).appendTo(lhsview);
        lax.selectImage(image);
    };

    this.addControlListiner = function(){
        $("#close").click(function(){
           lax.deselectAll();
           lax.deactivateEditMode();
        });

        $("#next").click(function(){
           lax.nextImage();
        });

        $("#previous").click(function(){
           lax.previousImage();
        });
    };

    // Events

}