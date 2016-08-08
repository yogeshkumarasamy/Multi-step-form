(function() {
	var getSet = document.getElementsByClassName("set");
    var i;
    for (i = 0; i < getSet.length; i++) {
    	if(i>=1) {
    		getSet[i].className += " hide";
    		console.log(i);
    	}        
    }
})();