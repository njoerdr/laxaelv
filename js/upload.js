
function Upload() {
    var self = this;

	var droplet = $("[type='html/upload']").html();

    var transfer = function(form) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/upload', true);
        xhr.onload = function() {
            indicator.value = 1;
        };
        xhr.upload.onprogress = function(event) {
            if(event.lengthComputable) {
                indicator.value = event.loaded/event.total;
            }
        };
        xhr.onreadystatechange = function () {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200 && xhr.status !== 202 && xhr.status !== 304) {
                return alert('HTTP error ' + xhr.status);
            }
            return alert(xhr.responseText);
        }
        xhr.send(form);
    };



	this.render = function(parent) {
		$($.render(droplet)).appendTo(parent);
	};

    this.addListeners = function() {
        var domElement = document.getElementById('upload');
        var upform = document.getElementById('upform');

        domElement.onclick = function() {
            upform.click();
            upform.onchange = function() {
                upform.parentElement.submit();
            };
        };

        domElement.ondragover = function() {
            this.className = 'hover';
            return false;
        };
        domElement.ondragleave = function () { 
            this.className = ''; 
            return false; 
        };
        domElement.ondrop = function(event) {
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
            transfer(form);
        };
    };


}