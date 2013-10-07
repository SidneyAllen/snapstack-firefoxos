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
        "click .selectImageBtn": "selectImage"
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
            console.log(event.target.result);
            imageData = event.target.result;
            var base64Content = imageData.substring(imageData.indexOf(',') + 1, imageData.length);
            var fileType = imageData.substring(imageData.lastIndexOf(":")+1,imageData.lastIndexOf(";"));
            var fileName = "someImage.png";
            
            $("#imageUpload").attr("src", imageData);
           };
        };
        
        a.onerror = function() { 
            alert("Failure when trying to pick an image!"); 
        };
        
        return this;
      },

      save: function(e) {
        e.preventDefault();
  
        var item = $('#addForm').serializeObject(),
            self = this;

        var c = document.getElementById("myCanvas");
        var imageData = c.toDataURL();
        var base64Content = imageData.substring(imageData.indexOf(',') + 1, imageData.length);
        var fileType = imageData.substring(imageData.lastIndexOf(":")+1,imageData.lastIndexOf(";"));
        var fileName = "someImage.png";
        
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

            $("#image-presenter").empty();
            var c = document.getElementById("myCanvas");
            c.width = "300px";
            c.height = "300px";

            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);

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