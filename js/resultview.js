/* Result Presenter */

var ResultView = function(){
    // Templates
    var resulttemplate = $("[type='html/result']").html();

    // Elements
    var lhsview = $("#lhsview");

    //var up = new Upload();

    var imgClick = function() {
        var image = $(this).attr("id");
        lax.chooseImage(image);
    };

    var flagClick = function() {
        $(this).parent().toggleClass("marked");
        if($(this).parent().hasClass("marked")) {
            this.innerHTML = '&#xe813;';
            lax.selectImage($(this).parent().children().first().attr("id"));
        } else {
            this.innerHTML = '&#xe814;';
            lax.deselectImage($(this).parent().children().first().attr("id"));
        }
    };

    this.render = function(){

        lhsview.empty();
        $($.render(resulttemplate)).appendTo(lhsview);

        var resultview = $("#resultview");

        //up.render(resultview);
        //up.addListeners();

        var images = lax.getImages();
        images.forEach(function(element){
            // DOM Manipulation
            var fignode = document.createElement('figure');
            var figcap = document.createElement('figcaption');
            figcap.innerHTML = element;
            var flag = document.createElement('button');
            flag.className = 'flagbutton';
            flag.innerHTML = '&#xe814;';
            flag.onclick = flagClick;

            var img = new Image();
            img.id = element;
            img.className = 'thumb';
            img.src = 'small/' + element;
            img.onclick = imgClick;

            fignode.appendChild(img);
            fignode.appendChild(flag);
            fignode.appendChild(figcap);

            resultview.append(fignode);
        });
    };

    // Events
    lax.on("querychange", function(){
        this.render();
    }.bind(this));

    return this;
};
