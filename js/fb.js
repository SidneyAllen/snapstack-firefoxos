define(['facebook'], function(facebook){
 console.log("fb.js")


  FB.init({
    appId      : '175954412594328',
    channelUrl : '//www.crushitmobile.com/channel.html'
  });
  
  FB.getLoginStatus(function(response) {
  	console.log("YES")
    console.log(response);

  });
  return FB;

});