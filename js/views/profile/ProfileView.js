define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/home/homeTemplate.html',
  'text!templates/profile/profileTemplate.html',
  'router',
  'libs/app/util'
], function($,_,Backbone, Stackmob, HomeTemplate, ProfileTemplate, Router, Util){

  var ProfileView = Backbone.View.extend({
      className: "profile",   
      events: {  
        "click #saveBtn": "save",
        "click .logout": "logout"
      },

      initialize: function() {
        this.router = this.options.router;
        this.model = this.options.model;
        this.template = _.template(ProfileTemplate);
     },

      render: function() {
        var self = this;
        self.$el.empty();
        self.$el.append(HomeTemplate);
        self.$el.attr("id","profileView");
        
        var content = self.$el.find(":jqmData(role='content')");
        content.append(self.template(self.model.toJSON()));
       
        return this;
      },

      save: function(e) {
        var self = this,
              item = Util('#profileForm').serializeObject();
        e.preventDefault();

        var loginStatus = StackMob.isLoggedIn();

        if(!loginStatus) {
            this.router.navigate("#login", {trigger: true});
        } else {
          
          if(item.email === ''){
            //alert('error no email');
            $.mobile.loading('hide');
          
          } else {
            $('#saveBtn').attr('disabled',true);

              var loadingMsg = "Updating Profile ...";
              
              self.model.set("email", item.email);
              
              self.model.save({
                  success: function(model){
                    $.mobile.loading('hide');
                    $('#saveBtn').attr('disabled',false); 
                     self.router.navigate("#photoupload", {trigger: true});           
                  },
                  error: function(error){
                    alert("Error saving profile");
                    $.mobile.loading('hide');
                    $('#saveBtn').attr('disabled',false);
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
      },
      
      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"profile"); 
        return this;
      }
    });

  return ProfileView;
  
});