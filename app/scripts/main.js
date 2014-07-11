(function(){
	var townData=[];
	var currentLat,
	currentLng,
	userLocation;
	var screenHeight = $(window).height();

	var map = new GMaps({
		div:'#map',
		lat: 0,
  	lng: 0,
  	disableDefaultUI:true,
	});

	$.rand = function(arg) {
      if ($.isArray(arg)) {
          return arg[$.rand(arg.length)];
      } else if (typeof arg === "number") {
          return Math.floor(Math.random() * arg);
      } else {
          return 4;  // chosen by fair dice roll
      }
  };

  function setStartLocation(){
  	$.getJSON('data/towns.json', function(data) {
	  	$.each(data.towns,function(index, value){
	  		//console.log(value);
	  		townData.push(value); // drop json data into an array
	  	});
	  	newTown(); // load the first town after data is initially loaded
	  });
  }

  function setUserLocation(){
  	$.getJSON('http://freegeoip.net/json/', function(data){
	  	userLocation = data.city;
			$('.userLocation p').html('Forget '+userLocation+', you pretentious hipster. Your new spot takes place in');
	  });
  }

	function changeMapLocation(latitude,longitude){
		map.removeMarkers();
		map.setCenter(latitude,longitude);
		map.addMarker({
			lat:latitude,
			lng:longitude
		});
	}

	function updateMap(){
		changeMapLocation(currentLat,currentLng);
	}

	function newTown(){
		var randomTown = $.rand(townData);
		var randomLat = randomTown.lat;
		var randomLng = randomTown.lng;
		console.log(randomTown);
		changeMapLocation(randomLat, randomLng);
		currentLat = randomLat;
		currentLng = randomLng;
	}

	function startApp(){
		setStartLocation();
		setUserLocation();
	}

	$(window).on('resize',function(){
		updateMap();
	});

	$(document).ready(function() {
		startApp();
	});

	$('.reloadLocation').on('click',function(){
		newTown();
	});


})();