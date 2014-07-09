(function(){
	var townData=[];

	// var map = new GMaps({
	// 	div:'#map',
	// 	lat: 0,
 //  	lng: 0,
 //  	disableDefaultUI:true,
	// });

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
  		console.log(value);
  		townData.push(value);
  	});
  });

	function changeLocation(latitude,longitude){
		map.removeMarkers();
		map.setCenter(latitude,longitude);
		map.addMarker({
			lat:latitude,
			lng:longitude
		});
	}

	//changeLocation(40.192408,-85.387218);

})();