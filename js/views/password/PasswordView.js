define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/home/homeTemplate.html',
  'text!templates/password/passwordTemplate.html',
  'router'
], function($,_,Backbone, Stackmob, HomeTemplate, PasswordTemplate, Router){

  var ProfileView = Backbone.View.extend({
      className: "password",   
      events: {  
        "click #saveBtn": "save"
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

      save: function(e) {
        var self = this,
              item = Util('#passwordForm').serializeObject();
        e.preventDefault();

        var loginStatus = StackMob.isLoggedIn();

        if(!loginStatus) {
            this.router.navigate("#login", {trigger: true});
        } else {
          
          if(item.newpassword === ''){
            //alert('error no email');
            $.mobile.loading('hide');
          
          } else {
            $('#saveBtn').attr('disabled',true);

              var loadingMsg = "Updating Profile ...";
              StackMob.getLoggedInUser({
                success: function(username) {
    
                  var user = new StackMob.User({ username: username });
                  user.resetPassword(item.oldpassword, item.newpassword, {
                    success: function(model){
                      $.mobile.loading('hide');
                      $('#saveBtn').attr('disabled',false); 
                       self.router.navigate("#profile", {trigger: true});           
                    },
                    error: function(error){
                      alert("Error saving profile");
                      $.mobile.loading('hide');
                      $('#saveBtn').attr('disabled',false);
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

  return ProfileView;
  
});