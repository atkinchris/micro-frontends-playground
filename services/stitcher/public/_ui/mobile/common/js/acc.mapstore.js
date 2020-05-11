function drawStore()
{
	var centerPoint = new google.maps.LatLng(storelatitude, storelongitude);
	var mapOptions = {
        center: centerPoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 13,
		zoomControl: false,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: false,
		draggable: true
	}
    
	ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
	overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));
	addStore(new google.maps.LatLng(storelatitude, storelongitude));
}

function addStore(coord) {
	
	marker = new google.maps.Marker({
		position: coord,
		map: overlay.getMap(),
		icon:"/_ui/mobile/theme-tu/images/markers/gm-pin.png"
	});
	
	markers.push(marker);
	var bounds = new google.maps.LatLngBounds();
	var str =  "<div class=\"storedetails-markup\"><ul><li class=\"storename\">" + storename + "</li>";
	str += "<li>" + storeaddressline1;
	if (storeaddressline2 !='')
		str += ',&nbsp;'+storeaddressline2;
	str += ',&nbsp;'+storeaddresstown;
	str += ',&nbsp;'+storeaddresspostalCode + "</li>";
	str += '<li class="phone">' + storecontactnumber + "</li>";
	
	if(containsCandC == "true"){
		str +=	'<li class="feature">Click &amp; collect available</li>';
	}else{
		str +=	'<li class="feature">Click &amp; collect not available</li>';
	}
	
    if(containsClothing == "true"){
    	str +=	'<li class="feature">Clothing stocked in store</li>';
	}else{
		str +=	'<li class="feature">Clothing not stocked in store</li>';
	}
	
    str += "<li><a class=\"viewstorelink\" href='" + storelink + "'>" + linktext +"</a></li></ul></div>";
	
	
	
	
	if (markers.length==1) {
		infowindow = new google.maps.InfoWindow({
			content: str,
			disableAutoPan: false
		});
		marker=markers[0];
		overlay.getMap().panTo(marker.getPosition());
		infowindow.open(overlay.getMap(), marker);
	}
	
		
	
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