define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/welcome/welcomeTemplate.html',
  'libs/app/util',
  'fb'
], function($,_,Backbone, Stackmob, WelcomeTemplate,Util,FB){


   var WelcomeView = Backbone.View.extend({

    events: {
      "click .facebook": "facebook"
    },

    initialize: function() {
      this.router = this.options.router;
    },

    render: function(eventName) {
      $(this.el).html(WelcomeTemplate);

      return this;
    },

    facebook : function(e) {
      console.log('Facebook login');
      var self = this;
      e.preventDefault();

      FB.login(function(response) {
        if(response.authResponse) {
          var accessToken = response.authResponse.accessToken;
 
          FB.api('/me', function(response) {
            var user = new StackMob.User({
              username : response.username,
              email : response.email,
              loginWithFacebook : true
            });
            user.loginWithFacebookAutoCreate(accessToken, true, {
              success : function() {
                user.save({email : response.email});
                self.router.navigate('#photoupload', {trigger : true});
              },
              error : function(model, response) {
                alert('Oops! Trouble logging in with Facebook.');
              }
            });
          },{ scope: 'email' });
          
        }
      });
    }
  });
  

  return WelcomeView;
  
});