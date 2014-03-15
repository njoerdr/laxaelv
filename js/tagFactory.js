var TagFactory = {
	createTag:function(tagdata, parent) {
	    var tag = document.createElement('span');
	    tag.className = 'tag ' + tagdata.weight + ' ' + tagdata.type;
	    var label = document.createElement('span');
	    label.innerHTML = tagdata.tag;
	    var button = document.createElement('button');
	    button.className = 'x';
	    button.innerHTML = 'X';

	    tag.appendChild(label);
	    tag.appendChild(button);

	    parent.append(tag);

	    $(tag).draggable({ stack: ".tag" });

		return tag;
	},
	unbindAll:function(tag) {
		$(tag).unbind();
		$(tag).children().first().unbind('click');
	},
	addToQueryListener:function(tag) {
	    tag.onclick = function(e) {
	        var tagtext = $(this).children().first().text();
	        lax.addTagToQuery(tagtext);
	    };
	},
	addToEditListener:function(tag) {
	    tag.onclick = function(e) {
	    	e.stopImmediatePropagation();
	        var tagtext = $(this).children().first().text();
	        lax.saveTag(tagtext);
	    };
	},
	addRemoveFromQueryListener:function(tag, queryId) {
	    tag.lastChild.onclick = function(e) {
	        var tagtext = $(this).parent().children().first().text();
	        lax.removeTagFromQuery(tagtext, queryId);
	    };
	},
	addDeleteTagListener:function(tag) {
	    tag.lastChild.onclick = function(e) {
	    	e.stopImmediatePropagation();
	        var tagtext = $(this).parent().children().first().text();
	        lax.removeTag(tagtext);
	    };
	},
	addSearchListener:function(tag) {
		tag.onclick = function(e) {
			var tagtext = $(this).text();
			tagtext = tagtext.slice(0, tagtext.length-1);
			lax.addTagsToQuery([tagtext]);
			lax.deactivateDetailMode();
		};
	},
	addDraggabillity:function(tag) {
		$(tag).draggable({ stack: ".tag" });
	}
};