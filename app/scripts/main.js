(function(){
	var townData=[];

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

  $.getJSON('data/towns.json', function( data ) {
  	$.each(data.towns,function(index, value){
  		//console.log(value);
  		townData.push(value); // drop json data into an array
  	});
  	newTown(); // load the first town after data is initially loaded
  });

	function changeMapLocation(latitude,longitude){
		map.removeMarkers();
		map.setCenter(latitude,longitude);
		map.addMarker({
			lat:latitude,
			lng:longitude
		});
	}

	function newTown(){
		var randomTown = $.rand(townData);
		console.log(randomTown);
		changeMapLocation(randomTown.lat, randomTown.lng);
	}

})();