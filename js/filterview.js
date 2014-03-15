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
        var id = 0;
        var querybox = new Querybox(id);
        $($.render(querytemplate)).appendTo(rhsview);
        querybox.render();
        querybox.searchBoxListeners();

        var filterTagcloud = new FilterTagcloud();
        $($.render(cloudtemplate)).appendTo(rhsview);
        filterTagcloud.render();
        filterTagcloud.controlListeners();
    };

    return this;
};