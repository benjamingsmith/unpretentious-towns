(function(){
	var map = new GMaps({
		div:'#map',
		lat: 0,
  	lng: 0,
  	disableDefaultUI:true,
	});

	function changeLocation(latitude,longitude){
		map.removeMarkers();
		map.setCenter(latitude,longitude);
		map.addMarker({
			lat:latitude,
			lng:longitude
		});
	}

	changeLocation(0,0);

})();