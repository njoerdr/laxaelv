
function Upload() {
	var droplet = $("[type='html/upload']").html();

	droplet.ondragover = function() {
        this.className = 'hover';
   		return false;
    };
    droplet.ondragleave = function () { 
    	this.className = ''; 
        return false; 
    };
    droplet.ondrop = function(event) {
    	var form = new FormData();
        this.className = ''; 
    	event.preventDefault();
    	var imgs = event.dataTransfer.files;
    	for(var i = 0; i < imgs.length; i++) {
    		if(imgs[i].type === 'image/jpeg') {
    			form.append('file', imgs[i]);
    		} else {
    			alert('Only images of type JPEG are supported.');
    		}
    	}
    };

	this.render = function(parent) {
		$($.render(droplet)).appendTo(parent);
	};


}