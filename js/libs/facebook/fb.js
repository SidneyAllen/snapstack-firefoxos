define(['facebook'], function(FB){
  console.log("lib/facebook/fbjs")
  FB.init({
    appId      : '175954412594328',
    channelUrl : '//yourdomain.com/channel.html'
  });

  FB.getLoginStatus(function(response) {
  	console.log("YES")
    console.log(response);

  });
  return FB;
});