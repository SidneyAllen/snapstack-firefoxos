define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/login/loginTemplate.html',
  'libs/app/util'
], function($,_,Backbone, Stackmob,LoginTemplate,Util){
  
  var LoginView = Backbone.View.extend({
      className : 'loginView',
      events: {  
        "click #submitLogin": "login"
      },

      initialize: function() {
        this.collection = this.options.collection;
        this.router = this.options.router;
      },

      render: function() {
        var self = this;

        self.$el.empty();
        self.$el.append(LoginTemplate);
        self.$el.attr("data-role","dialog");
        self.$el.attr("data-theme","b");      
             
        return this;
      },

      login: function(e) {
          var self = this,
              item = Util('#loginForm').serializeObject();
          
          e.preventDefault();

          $.mobile.loading( 'show', {
            text: "Logging In!",
            textVisible: true,
            theme: "b"
          });

          if(!StackMob.isLoggedIn) {
            var user = new StackMob.User(); 
              user.logout({
                success: function() {
                  console.log("logout success");
                },
                error: function(error) {
                  alert("logout error");
                  console.log(error);
                }
              });
          } else {

            $('#loginBtn').addClass('disabled');
            $('#loginBtn').attr('disabled',true);

            var user = new StackMob.User(item);
            user.login(false,{
              success: function(model){
                LoggedInUserObject = model;
              
                $.mobile.loading('hide');
               
                self.collection.fetch({async: true});
                self.collection.comparator = function(photo) {
                  return -photo.get("createddate");
                };


                self.router.navigate("#photoupload", {trigger: true},'photoupload');   

                $('input.usernameLogin').val('');
                $('input.passwordLogin').val('');
                             
              },
              error: function(error){ 
                alert("Login Error")
                $.mobile.loading('hide');
              }
            });  
          }
          return this;
        }
    });

  return LoginView;
  
});