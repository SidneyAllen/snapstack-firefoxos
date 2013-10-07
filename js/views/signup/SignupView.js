define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/signup/signupTemplate.html',
  'libs/app/util'
], function($,_,Backbone, Stackmob,SignupTemplate,Util){
  
  var SignupView = Backbone.View.extend({
      className: "signup",   
      
      events: {  
        "click #signupBtn": "signup",   
        "change #photo": "saveImage"
      },

      initialize: function() {
         this.collection = this.options.collection;
         this.router = this.options.router;
         this.render();
         this.photoBase64;
      },

      saveImage: function(e) {
        var f = e.target.files[0];
        if (f.type.match('image.*')) {
          
          var reader = new FileReader();
          reader.readAsDataURL(f);

          reader.onload = (function(e) {
            var base64Content = e.target.result.substring(e.target.result.indexOf(',') + 1, e.target.result.length);
            $(".latest img").attr("src", e.target.result).fadeIn();
            $(".latest img").attr("data-base64", base64Content);
            $(".latest img").attr("data-name", f.name);
            $(".latest img").attr("data-type", f.type);

          });
        } else {
          console.log("not valid image handle exception");
        }
        
        return this;
      },

      render: function() {
        var el = this.$el;

        el.empty();
        el.append(SignupTemplate);
        el.attr("data-role","dialog");
        el.attr("data-theme","b");

        return this;
      },

      signup: function(e) {
        var collection = this.collection,
                  item = $('#signupForm').serializeObject(),
                router = this.router;
                 
        e.preventDefault();
        
        if (item.username === ''){
          
        } else if (item.password === ''){
          
        } else {
          $('#signupBtn').addClass('disabled');
          $('#signupBtn').attr('disabled',true);

          var user = new StackMob.User(item);
          var base64Content = $(".latest img").attr("data-base64");
          var fileName = $(".latest img").attr("data-name");
          var fileType = $(".latest img").attr("data-type");
          
          if(fileName !== undefined) {
            user.setBinaryFile("pic", fileName, fileType, base64Content);
          }

          user.set("loginWithFacebook", false);
          
          $.mobile.loading( 'show', {
            text: "Signing Up!",
            textVisible: true,
            theme: "b"
          });

          console.log(StackMob.isLoggedIn());
          if(!StackMob.isLoggedIn) {
            var user = new StackMob.User(); 
              user.logout({
                success: function() {
                  console.log("logout success");
                },
                error: function(error) {
                  alert("Logout error");
                  console.log(error);
                }
              });
          } else {
            user.create({
              success: function(model){
                
                var user = new StackMob.User(model.toJSON());
                  user.login(false,{
                    success: function(model){
                      $.mobile.loading('hide');
                      $('input.usernameSignup').val('');
                      $('input.passwordSignup').val('');
                      $('input.imagePickerSignup').val('');
                      $('.latest img').attr('src','');
                      router.navigate("#photoupload", {trigger: true}); 
                    },
                    error: function(error){
                      alert("Signup Success, but Login Error");
                      $.mobile.loading('hide');
                    }
                  });  

              },
              error: function(e){
                  alert("Signup Error");
                  console.log(e);
                  $('#signupBtn').removeClass('disabled');
                  $('#signupBtn').attr('disabled',false);
                  $.mobile.loading('hide');
              }
            }); 
          }
        }
        
        return this;
      }
    });

  return SignupView;
  
});