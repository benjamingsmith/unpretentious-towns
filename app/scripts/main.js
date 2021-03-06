(function(){
	var townData=[];
	var currentLat,
	currentLng,
	userLocation,
	centerUserLocation,
	device;
	var screenHeight = $(window).height();
	var screenWidth = $(window).width();

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
	  		townData.push(value); // drop json data into an array
	  	});
	  	newTown(); // load the first town after data is initially loaded
	  });
  }

  function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)){
			device = 'mobile';
			console.log('DEVICE: MOBILE');
		}
		else {
			device = 'desktop';
			console.log('DEVICE: DESKTOP');
			return false;
		}
	}

  function setUserLocation(){
  	var locationBarWidth = $('.userLocation').width()/2;
  	$.getJSON('http://freegeoip.net/json/', function(data){
	  	userLocation = data.city;
	  	//console.log(data);
			$('.userLocation p').html('Forget '+userLocation+', you tedious hipster. Your new spot takes place in');
			centerUserLocation = -$('.userLocation').width()/2-122;
			//$('.userLocation').css({'margin-left':centerUserLocation});
			//$('.userLocation').addClass('center');
	  });
  }

	function changeMapLocation(latitude,longitude){
		map.setCenter(latitude,longitude);
		map.addMarker({
			lat:0,
			lng:0
		});
	}

	function updateMap(){
		changeMapLocation(currentLat,currentLng);
	}

	function centerText(){
		$('.shootLocation').css({'margin-top':-$('.shootLocation').height()/2});
	}

	function newTown(){
		var randomTown = $.rand(townData);
		var randomLat = randomTown.lat;
		var randomLng = randomTown.lng;

		console.log(randomTown);
		changeMapLocation(randomLat, randomLng);
		currentLat = randomLat;
		currentLng = randomLng;

		$('.location-town').html(randomTown.town+',');
		$('.location-state').html(randomTown.state);

		$('.location-town').fitText(.6, { minFontSize: '70px'});
		$('.location-state').fitText(.6, { minFontSize: '70px'});
		centerText();
		TweenLite.from($('.location-town, .location-state'),.3,{'font-size':'0px',ease:Sine.easeOut, onComplete:centerText});
	}

	function centerUserLocation(){
		var headerWidth = $('.userLocation').width();
		$('.userLocation').css({'margin-left':-headerWidth/2-98/2});
	}

	function startApp(){
		setStartLocation();
		detectmob();
		if(device == 'desktop'){
			setUserLocation();
		} else if(device=='mobile'){
			$('.userLocation p').html('Forget NYC and LA, you tedious hipster. Your new spot takes place in');
		}
	}

	$(window).on('resize',function(){
		updateMap();
		centerText();
		//centerUserLocation();
	});

	$(document).ready(function() {
		startApp();
	});

	$('.reloadLocation').on('click',function(){
		newTown();
	});


})();