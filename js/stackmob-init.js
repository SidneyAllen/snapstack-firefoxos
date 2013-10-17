define(['stackmob'], function(StackMob) {
  
  // What URL is the app being served from.
  var str = window.location.href;
	var prod=str.search("http://firefoxos.stackmob.stackmobapp.com");
	var dev=str.search("http://dev.firefoxos.stackmob.stackmobapp.com");
	
	// If on production URL, use production API key
	if(prod === 0) {
		StackMob.init({
	    	publicKey:  "012963e7-dd06-4781-b0e8-6e13dfd6f337",
	    	apiVersion: 1
		});
		console.log('init production');
	// If on development URL, use development API key
	} else if(dev === 0) {
		StackMob.init({
		    publicKey:  "20ede513-a51b-49c2-ad38-8148077cfaa7",
		    apiVersion: 0
		});
		console.log('init development');
	// If local URL, use production API key
	} else {
		// During development you'd want to user your Development API Key
		StackMob.init({
		    publicKey:  "20ede513-a51b-49c2-ad38-8148077cfaa7",
		    apiVersion: 0
		});
		console.log('init dev for local (firefoxos, phoneGap, etc)');
	}

  // return a particular StackMob that we've initialised
  return StackMob;
});