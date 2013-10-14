define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/home/homeTemplate.html',
  'text!templates/password/passwordTemplate.html',
  'router',
  'libs/app/util'
], function($,_,Backbone, Stackmob, HomeTemplate, PasswordTemplate, Router,Util){

  var PasswordView = Backbone.View.extend({
      className: "password",   
      events: {  
        "click #submitPassword": "save", 
        "keypress .oldPasswordLogin":  "onEnter",
        "keypress .newPasswordLogin":  "onEnter"
      },

      initialize: function() {
        this.router = this.options.router;
        this.model = this.options.model;
      },

      render: function() {
        var self = this;

        self.$el.empty();
        self.$el.append(PasswordTemplate);
        self.$el.attr("id","passwordView");

        return this;
      },

      onEnter: function(e) {

        if (e.keyCode == 13) {
          console.log("press")
          e.preventDefault();
          $(".oldPasswordLogin").blur();
          $(".newPasswordLogin").blur();
        }
      },

      save: function(e) {
        var self = this,
              item = Util('#passwordForm').serializeObject();
        e.preventDefault();
        console.log("SAVE")
        var loginStatus = StackMob.isLoggedIn();

        if(!loginStatus) {
            this.router.navigate("#login", {trigger: true});
        } else {
          
          if(item.newpassword === ''){
            //alert('error no email');
            $.mobile.loading('hide');
          
          } else {
            $('#savePasswordBtn').attr('disabled',true);

              var loadingMsg = "Changing Password ...";
              StackMob.getLoggedInUser({
                success: function(username) {
    
                  var user = new StackMob.User({ username: username });
                  user.resetPassword(item.oldpassword, item.newpassword, {
                    success: function(model){
                      $.mobile.loading('hide');
                      $('#savePasswordBtn').attr('disabled',false); 
                       self.router.navigate("#profile", {trigger: true});           
                    },
                    error: function(error){
                      alert("Error saving profile");
                      $.mobile.loading('hide');
                      $('#savePasswordBtn').attr('disabled',false);
                    }
                  });

                }
              });
              
            $.mobile.loading( 'show', {
              text: loadingMsg,
              textVisible: true,
              theme: "b"
            });    
          }
        }

        return this;
      }
      
    });

  return PasswordView;
  
});