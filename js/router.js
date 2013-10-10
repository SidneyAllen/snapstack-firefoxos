// Filename: router.js
define([
  'jquery',
  'stackmobinit',
  'libs/app/util',
  'views/welcome/WelcomeView',
  'views/photo/PhotoView',
  'views/photo/PhotoUploadView',
  'views/photo/PhotoDetailView',
  'views/profile/ProfileView',
  'views/password/PasswordView',
  'views/signup/SignupView',
  'views/login/LoginView',
  'views/home/LogoutButtonView',
  'views/home/LoginButtonView',
  'views/map/MapView',
  'collections/photo/PhotoCollection',
], function($, StackMob, Util, WelcomeView, PhotoView, PhotoUploadView, PhotoDetailView, ProfileView, PasswordView, SignupView, LoginView, LogoutButtonView,LoginButtonView, MapView, PhotoCollection) {
  
  var AppRouter = Backbone.Router.extend({
    routes:{
        "":"welcome",
        "photo":"photo",
        "photoupload":"photoupload",
        "photo/:id":"photo",
        "profile":"profile",
        "password":"password",
        "login":"login",
        "logout":"logout",
        "signup":"signup",
        "map":"map"
    },

    initialize: function(options) {
      this.collection = options.collection;

      // Handle back button throughout the application
      $('.back').live('click', function(event) {
        window.history.back();

        return false;
      });
      this.firstPage = true;
    },

    welcome:function(e) {
      this.changePage(new WelcomeView({router : this}),'welcome','Welcome');
    },

    photo:function(e) {
      this.changePage(new PhotoView({collection : this.collection, router : this}),'photo','Photo');
    },

    map:function(e) {
      this.changePage(new MapView({collection : this.collection, router : this}),'map','Map');
    },

    photoupload:function(e) {
      this.changePage(new PhotoUploadView({collection : this.collection, router : this}),'photoupload','Photo Upload');
    },

    photodetail:function(e) {
      model = this.collection.get(e);
      this.changePage(new PhotoDetailView({collection: this.collection, model: model}),'photodetail','Photos','slide');
    },

    profile:function() {
      var self = this;

      StackMob.getLoggedInUser({
        success : function(username) {
          var currentUser = new StackMob.User({username: username});
          currentUser.fetch({
            success : function(model) {
              self.changePage(new ProfileView({collection: self.collection, model: model, router: self}),'profile','Profile');
            }, 
            error: function(error){ console.log("error fetching current user")}
          });
        }, 
        error: function(error){ console.log("error getting logged in user")}
      });
    },

    password:function(e) {
      this.changePage(new PasswordView({collection : this.collection, router : this}),'password','Password');
    },

    login:function(e) {
     this.changePage(new LoginView({collection: this.collection,router: this}),'loginView','Login','flip');
    },

    logout:function(e) {
      this.navigate("#",{ trigger : true});
    },

    signup:function(e) {
      this.changePage(new SignupView({collection: this.collection,router: this}),'signup', 'Signup','flip');
    },

    changePage:function (view,className,navLabel,transition) { 
      var self = this;
      var page = $("." + className);

      if(transition === 'undefined') {
        var transition = $.mobile.defaultPageTransition;
      }
      
      // We don't want to slide the first page
      if (this.firstPage) {
          transition = 'none';
          this.firstPage = false;
      }

      var removeIndex = ['password','profile'].indexOf(className);
 
      if(removeIndex >= 0) {
        page.remove();
        page.html('');
      }

      // check if page exists in DOM
      if (!page.html()){
        view.render();
        $('body').append($(view.el));  
        page = view.el;      
      }

      // Go to new page
      $.mobile.changePage($(page), {changeHash:false, transition: transition, reverse: false});
   
      // set selected tab bar item
      Util(page).setNavBar(navLabel);
      
      var index = ['photo','photoupload','profile'].indexOf(className);

      if(className === 'map') {
        setTimeout(function(){
          var mapIframe = document.getElementById('mapIframe');
          mapIframe.contentWindow.postMessage(JSON.stringify(self.collection.toJSON()), '*');
        }, 4000);
      }
        

    }, 

  });
  
  var initialize = function(){

    var photoCollection = new PhotoCollection();
    photoCollection.fetch({async: true});
    /*
    photoCollection.comparator = function(photo) {
      return -photo.get("createddate");
    };
  */
    var app_router = new AppRouter({collection: photoCollection});

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});