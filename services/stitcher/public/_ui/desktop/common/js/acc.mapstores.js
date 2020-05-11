var infowindow = null;

function drawUKMap(){
	var centerPoint = new google.maps.LatLng(51.5286417, 3.7490596);
	var mapOptions = {
		zoom: 1,
		zoomControl: true,
		panControl: true,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: centerPoint
	}

	ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
	overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));
	var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(storeSearchPageDataboundSouthLatitude, storeSearchPageDataboundWestLongitude), new google.maps.LatLng(storeSearchPageDataboundNorthLatitude, storeSearchPageDataboundEastLongitude));
	overlay.getMap().fitBounds(bounds);

	
}

function drawStores()
{
	var centerPoint = new google.maps.LatLng(storeSearchPageDatasourceLatitude, storeSearchPageDatasourceLongitude);
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
	var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(storeSearchPageDataboundSouthLatitude, storeSearchPageDataboundWestLongitude), new google.maps.LatLng(storeSearchPageDataboundNorthLatitude, storeSearchPageDataboundEastLongitude));
	overlay.getMap().fitBounds(bounds);

}
if (typeof drawStoresFinal == 'undefined')
{
}
else
{
	drawStoresFinal();
}

function addStore(coord, name, distance, line1, town, postCode, linkText, linkUrl, selectUrl, showSelect, CSRFToken, selectButtonText, displayName, features)
{
	var marker = new google.maps.Marker({
		position: coord,
		map: overlay.getMap(),
		title: name,
		icon: "/_ui/desktop/theme-tu/images/markers/marker" + String.fromCharCode(markers.length + 65) + ".png"
	});
	
	var content = "";
	content +=""
	content += "<div class=\"infowindow\">";
	content += "<div class=\"addressdetails\"><ul><li class=\"storename\">";
	content +=  displayName + "</li><li style=\"padding-bottom: 10px;\">" + distance + "</li><li>" + line1 + "</li>" +"<li>" + town + " " + postCode + "</li>";
	if ($('body').hasClass('page-storefinderPage')) {
		content += "</li><li><a class=\"viewstorelink\" href='" + linkUrl + "'>" + linkText +"</a></li></ul></div>";
	} else {
	content += "</li></ul></div>";
	}
	if(showSelect == true){
		content += "<form method='get' action='" + selectUrl + "'>" +
								"<input type='hidden' value='" + name +"' name='store' id='store' />" + 
								"<button class='' type='submit' id='selectStoreButton'>" + selectButtonText + "</button>" +
							"</form>";		}
	
	if($(features).length > 0){
	  content += "<div class=\"listdetails\"><ul class='tuClothingStore'>";
	  content += "<li class=\"stock\">Available at this store</li>";
	     if($.inArray('clothing', features) != -1){
	    	 if($.inArray('Womenswear', features) != -1){
	    		 content += "<li class='stocked'>Womens</li>";
	    	 }else{
	    		 content += "<li class='notStocked'>Womens</li>";
	    	 }
	    	 
	    	 if($.inArray('Menswear', features) != -1){
	    		 content += "<li class='stocked'>Mens</li>";
	    	 }else{
	    		 content += "<li class='notStocked'>Mens</li>";
	    	 }
	    	 
	    	 if($.inArray('Kidswear', features) != -1){
	    		 content += "<li class='stocked'>Children</li>";
	    	 }else{
	    		 content += "<li class='notStocked'>Children</li>";
	    	 }
	    	 
	    	 if($.inArray('Gok for Tu', features) != -1){
	    		 content += "<li class='stocked'>Gok for Tu</li>";
	    	 }else{
	    		 content += "<li class='notStocked'>Gok for Tu</li>";
	    	 }
	     }
	     
	     if($.inArray('Click & Collect', features) != -1){
    		 content += "<li class='clickCollect'>Click &amp; collect available</li>";
    	 }else{
    		// content += "<li class='unavailable'>Click &amp; collect not available</li>";
    	 }
	     
	     if($.inArray('clothing', features) == -1){
	    	 
	    	 /*content+="<li class='unavailable'>Clothing not stocked in store</li>";*/
	     }
	  
	  content += "</ul>";
	  content += "</div></div>"; 
	}
	
	markers.push(marker);
	
	// zoom map to show all markers
	var bounds = new google.maps.LatLngBounds();
	for(i=0; i<markers.length; i++) {
		bounds.extend(markers[i].getPosition());
	}
	overlay.getMap().fitBounds(bounds);	
	
	google.maps.event.addListener(marker, 'click', function ()
	{
		if (infowindow) {
	        infowindow.close();
	    }
		
		infowindow = new google.maps.InfoWindow({
			content: content,
			disableAutoPan: false
		});
		
		overlay.getMap().panTo(marker.getPosition());
		infowindow.open(overlay.getMap(), marker);
	});

}
