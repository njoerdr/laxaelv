function Router(){

    this.parse = function(path){
        if(!path){
            this.searchTags([[]]);
            return;
        }
        var method = path.split("?")[0];
        console.log(method);
        if(method==="search") this.parseSearch(path);
        if(method==="detail") this.parseDetail(path);
        if(method==="edit") this.parseEdit(path);
    };

    this.parseSearch = function(path){
        if(path.split("?").length<2){
            this.searchTags([[]]);
            return;
        }
        path.split("?").slice(1).forEach(function(element){
            var kv = element.split("=");
            if(kv.length != 2){
                this.searchTags([[]]);
                return;
            }
            var key = kv[0];
            var subqueries = kv[1].split(';');
            subqueries.forEach(function(query, index){
                subqueries[index] = query.split(",");
            }); 
            console.log(subqueries);
            if(key==="q") {
                this.searchTags(subqueries);
                return;
            }
            this.searchTags([[]]);
        }.bind(this));
    };

    this.parseEdit = function(path){
        console.log("edit history");
    };

    this.searchTags = function(values){
        //lax.deactivateEditMode();
        //lax.deactivateDetailMode();
        lax.addTagsToQuery(values);
    };


    this.parseDetail = function(path){
        var image = path.split("?")[1];
        lax.triggerDetails(image);
    };

    this.updateSearchURL = function(){
        var queries = lax.getQuery();
        var makeQuery = true;
        path = "index.html#search";

        queries.forEach(function(subquery, index) {
            if(subquery.length>0) {
                if(!makeQuery) {
                    path += ";";
                }
                if(makeQuery) {
                  path += "?q=";
                  makeQuery = false;  
                } 
                subquery.forEach(function(tag, index) {
                    if(index === 0) {
                        path += tag;
                    } else {
                        path += "," + tag;
                    }
                });
            }
        });
        //if(tags.length>0) path = path.substring(0, path.length -1);
        $.route(path);
    };

    this.updateEditURL = function(){
        console.log("editurl");
        path = "index.html#edit";
        $.route(path);
    };

    this.updateDetailURL = function(){
        path = "index.html#detail?";
        path += lax.getDetailImage();
        $.route(path);
    };

    $.route(function(path) {
        path = path.split('#')[1];
        this.parse(path);
    }.bind(this));


    // Events

    lax.on("querychange", function(){
        this.updateSearchURL();
    }.bind(this));

    lax.on("modechange", function(){
        /*if(lax.isEditMode()) this.updateEditURL();*/ 
        if(lax.isDetailMode()) this.updateDetailURL();
        else this.updateSearchURL();
    }.bind(this));

    lax.on("detailchange", function(){
        this.updateDetailURL();
    }.bind(this));
}