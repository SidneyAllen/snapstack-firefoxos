define(['stackmob'], function(StackMob) {
    
    var str = window.location.href;
	var prod=str.search("http://firefoxos.stackmob339.stackmobapp.com");
	var dev=str.search("http://dev.firefoxos.stackmob339.stackmobapp.com");
	
	if(prod === 0) {
		StackMob.init({
	    	publicKey:  "012963e7-dd06-4781-b0e8-6e13dfd6f337",
	    	apiVersion: 1
		});
		alert("Production")
		console.log('init production');
	} else if(dev === 0) {
		StackMob.init({
		    publicKey:  "20ede513-a51b-49c2-ad38-8148077cfaa7",
		    apiVersion: 0
		});
		console.log('init dev');

	} else {

		StackMob.init({
		    publicKey:  "20ede513-a51b-49c2-ad38-8148077cfaa7",
		    apiVersion: 0,
		    secure : StackMob.SECURE_NEVER
		});
		console.log('init dev firefoxos');

	}

	StackMob.init({
		    publicKey:  "20ede513-a51b-49c2-ad38-8148077cfaa7",
		    apiVersion: 0
		});
    
    // return a particular StackMob that we've initialised
    return StackMob;
});