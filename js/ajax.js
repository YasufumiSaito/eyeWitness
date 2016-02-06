$(document).ready(function(){
  $("button").click(function(){
    
    //highlight the button
    $("button").removeClass("selected");
    $(this).addClass("selected");
    
    //the AJAX
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $(this).text();
    var flickrOptions = {
      tags: animal,
      format:"json"
    };
    function displayPhotos(data) {
      var photoHTML = "<ul>";
      $.each(data.items, function(i, photo){
        photoHTML += "<li class='frame'>";
        photoHTML += "<a href='" + photo.link + "' class='image'>";
        photoHTML += "<img src='" + photo.media.m + "'></a><li>";
      });
      photoHTML += "</ul>";
      $("#photos").html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  }); // button part
  
  $("form").submit(function(evt){
    evt.preventDefault();
    var $searchField = $("#search");
    var $submitButton = $("#submit");
    
    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("Processing..");
    
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var value = $searchField.val();
    var flickrOptions = {
      tags: value,
      format:"json"
    };
    function displayPhotos(data) {
      $(".head").removeClass();
      $("form").remove();
      var photoHTML = "<ul>";
      $.each(data.items, function(i, photo){
        photoHTML += "<li class='frame'>";
        photoHTML += "<a href='" + photo.link + "' class='image'>";
        photoHTML += "<img src='" + photo.media.m + "'></a><li>";
      });
      photoHTML += "</ul>";
      $("#photos").html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
      var flat = $("#photos").flipster({
        style: 'coverflow',
        spacing: -0.5,
        loop: true
    });
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  }); // form event
}); //end ready