function drawStore()
{
	var centerPoint = new google.maps.LatLng(storelatitude, storelongitude);
	var mapOptions = {
		zoom: 13,
		zoomControl: true,
		panControl: true,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: centerPoint
	}
	ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
	overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));
	addStore(new google.maps.LatLng(storelatitude, storelongitude));
}

function addStore(coord) {
	
	marker = new google.maps.Marker({
		position: coord,
		map: overlay.getMap()
		/*icon: "http://maps.google.com/mapfiles/marker" + String.fromCharCode(markers.length + 65) + ".png"*/
	});
	markers.push(marker);
	var bounds = new google.maps.LatLngBounds();
	var str =  "<div class=\"storedetails-markup\"><ul><li class=\"storename\">" + storename + "</li>";
	str += "<li>" + storeaddressline1 + "</li>";
	str += "<li>" + storeaddressline2 + "</li>";
	str += "<li>" + storeaddresstown + "</li>";
	str += "<li>" + storeaddresspostalCode + "</li>";
	str += "<li>" + storeaddresscountryname + "</li></ul></div>";
	
	/*infowindow = new google.maps.InfoWindow({
		position: overlay.getMap().getCenter(),
		content: "<div class='strong'>" + storename + "</div>" +
				"<div>" + storeaddressline1 + "</div>" +
				"<div>" + storeaddressline2 + "</div>" +
				"<div>" + storeaddresstown + "</div>" +
				"<div>" + storeaddresspostalCode + "</div>" +
				"<div>" + storeaddresscountryname + "</div>"
	});*/
	//infowindow.open(overlay.getMap(), marker);*/

	google.maps.event.addListener(marker, 'click', function ()
	{
		if (infowindow) {
	        infowindow.close();
	    }
		
		infowindow = new google.maps.InfoWindow({
			content: str,
			disableAutoPan: false
		});
		
		overlay.getMap().panTo(marker.getPosition());
		infowindow.open(overlay.getMap(), marker);
	});
}

if (typeof drawStoreFinal == 'undefined')
{
}
else
{
	drawStoreFinal();
}