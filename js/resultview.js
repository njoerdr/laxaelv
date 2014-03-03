/* Result Presenter */

function ResultView(){
    // Templates
    var resulttemplate = $("[type='html/result']").html();

    // Elements
    var lhsview = $("#lhsview");

    // Functions

    this.render = function(){

        lhsview.empty();
        $($.render(resulttemplate)).appendTo(lhsview);

        var resultview = $("#resultview");

        var images = lax.getImages();
        images.forEach(function(element){
            var imagedata = {id: element, name: element};
            thumbnail = new Thumbnail(imagedata, resultview);
            thumbnail.render();
            thumbnail.addClickListeners();
        });

    };

    // Events
    lax.on("querychange", function(){
        this.render();
    }.bind(this));


}


/* Thumbnail Presenter */

function Thumbnail(imagedata, appendTo){
    // Templates
    var imagetemplate = $("[type='html/tumb']").html();

    // Elements
    var domElement;

    // Functions

    this.render = function(){
        domElement = $($.render(imagetemplate, imagedata)).appendTo(appendTo);
        domElement = domElement[0];
    };

    this.addClickListeners = function(){
        $(domElement).children("img").click(function(){
            var image = $(this).attr("id");
            lax.chooseImage(image);
        });

        $(domElement).children("button").click(function(){
            $(this).parent().toggleClass("marked");
            if($(this).parent().hasClass("marked")){
                $(this).text("unflag");
                lax.selectImage($(this).parent().children().first().attr("id"));
              }else{
                $(this).text("flag");
                lax.deselectImage($(this).parent().children().first().attr("id"));
            }
        });
    };

    // Events

}