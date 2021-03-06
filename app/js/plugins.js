$(function () {
	console.log("plugins.js");
});

$(document).ready(function() {

 //Tstemonials
$("#testemonial-carousel").owlCarousel({

      navigation : false, // Show next and prev buttons
      slideSpeed : 600,
      paginationSpeed : 400,
      autoPlay: 3000,
      singleItem:true

      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });

 //Hero Carousel
var owl = $("#hero-carousel");

  owl.owlCarousel({
    navigation : false,
    pagination : false,
    singleItem : true,
    transitionStyle : "fade"
  });

 $('.item h2').fadeIn(1500);
  // Custom Navigation Events
  $(".next").click(function(){
    $('.item h2').fadeOut(400);
    setTimeout(function(){ owl.trigger('owl.next') },1000);
    setTimeout(function(){ $('.item h2').fadeIn(800) },1000);
  })
  $(".prev").click(function(){
    $('.item h2').fadeOut(400);
    setTimeout(function(){ owl.trigger('owl.next') },1000);
    setTimeout(function(){ $('.item h2').fadeIn(800) },1000);
  })

//Wow JS
  new WOW().init();

});

 //MAP
    google.maps.event.addDomListener(window, 'load', init);
    var map;
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(50.450892,30.542148),
            zoom: 13,
            zoomControl: false,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: true,
            scrollwheel: true,
            panControl: false,
            streetViewControl: false,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}],
        }
        var mapElement = document.getElementById('kiev');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
['tets', 'undefined', 'undefined', 'undefined', 'undefined', 50.4501, 30.523400000000038, 'https://mapbuildr.com/assets/img/markers/solid-pin-blue.png']
        ];
        for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
            });
link = '';     }

}
