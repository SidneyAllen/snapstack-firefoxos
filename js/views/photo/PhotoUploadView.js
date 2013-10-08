define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'models/photo/PhotoModel',
  'text!templates/home/homeTemplate.html',
  'text!templates/photo/photoUploadTemplate.html',
  'router',
  'libs/app/util',
  'imagefit'
], function($,_,Backbone, Stackmob,PhotoModel, HomeTemplate, PhotoUploadTemplate, Router, Util,imagefit){

  var PhotoUploadView = Backbone.View.extend({
      className: "photoupload",   
      events: {  
        "click .logout": "logout",
        "click .saveBtn": "save",
        "click .selectImageBtn": "selectImage",
         "keypress .title":  "onEnter"
      },

      initialize: function() {
        this.collection = this.options.collection;
        this.router = this.options.router;
        this.template = _.template(PhotoUploadTemplate);
      },

      render: function() {
        var el = this.$el;
        template = this.template;
 
        el.empty();
        el.append(HomeTemplate);
        el.attr("id","photoUploadView");

        var content = el.find(":jqmData(role='content')");
        content.append(template());
 
        return this;
      },

      selectImage: function(e) {
        e.preventDefault();
          
        var a = new MozActivity({ name: "pick", data: { type: ["image/png", "image/jpg", "image/jpeg"]}});
        a.onsuccess = function() { var image = a.result;

          var reader = new FileReader();
          reader.readAsDataURL(image.blob);//Convert the blob from clipboard to base64
          reader.onload = function(event){
            
            imageData = event.target.result;
            var base64Content = imageData.substring(imageData.indexOf(',') + 1, imageData.length);
            var fileType = imageData.substring(imageData.lastIndexOf(":")+1,imageData.lastIndexOf(";"));
            var fileName = "newImage.png";

            $(".latest img").attr("src", imageData).fadeIn();
            $(".latest img").attr("data-base64", base64Content);
            $(".latest img").attr("data-name", fileName);
            $(".latest img").attr("data-type", fileType);


            
            //$("#imageUpload").attr("src", imageData);
           };
        };
        
        a.onerror = function() { 
            alert("Failure when trying to pick an image!"); 
        };
        
        return this;
      },

      onEnter: function(e) {
        if (e.keyCode == 13) {
          this.save(e); 
        }
      },

      save: function(e) {
        e.preventDefault();


  
        var item = $('#addForm').serializeObject(),
            self = this;

        var base64Content = $(".latest img").attr("data-base64");
        var fileName = $(".latest img").attr("data-name");
        var fileType = $(".latest img").attr("data-type");
        
        $.mobile.loading( 'show', {
            text: "Signing Up!",
            textVisible: true,
            theme: "b"
        });

        // Create a new instance of the photo model and populate it
        // with your form data.
        var photo = new PhotoModel(item);
        if(fileName !== undefined) {
          photo.setBinaryFile("photo", fileName, fileType, base64Content);
        }

        // Call the create method to save your data at stackmob
        photo.create({
          success: function(model, result, options) {

            $(".latest img").attr("src","");
            $('#title').val("");

            // Add new item to your collection
            self.collection.add(model);
            
            // Send a change event to our collection so the
            // list is refreshed on our homepage.
            self.collection.trigger('change');
            $.mobile.loading('hide');

            // Return back to the home page
            self.router.navigate('#photo', {
              trigger: true,
              replace: false
            });
          },
          error : function(error){
            alert("error saving")
            $.mobile.loading('hide');
          }
        });

        return this;
      },
      
      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"photoupload"); 
        return this;
      }
    });

  return PhotoUploadView;
  
});