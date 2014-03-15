/* Filterview presenter */

var FilterView = function(){
    // Templates
    var filtertemplate = $("[type='html/filter']").html();
    var cloudtemplate = $("[type='html/filtercloud']").html();
    var querytemplate = $("[type='html/querybox']").html();
    var rhsview = $("section#filter");

    //var filterTagcloud = new FilterTagcloud();
    //var querybox = new Querybox();

    // Functions
    this.render =function(){
        rhsview.empty();
        $($.render(filtertemplate)).appendTo(rhsview);
        lax.getQuery().forEach(function(subquery, index) {
            $($.render(querytemplate, {id:index})).appendTo(rhsview);
            var querybox = new Querybox(index);
            querybox.render();
            querybox.searchBoxListeners();
        });

        var filterTagcloud = new FilterTagcloud();
        $($.render(cloudtemplate)).appendTo(rhsview);
        filterTagcloud.render();
        filterTagcloud.controlListeners();
    };
    /*
    lax.on("querychange", function(){
        this.render();
    }.bind(this));
    */
    return this;
};