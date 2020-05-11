ACC.checkoutuselocation = {

    bindAll: function () {
        this.bindUseMyCurrentLocation('#mobileCheckoutUseCurrentLocation');
    },

    bindUseMyCurrentLocation: function (useMyCurrentLocationBtn) {
        $(useMyCurrentLocationBtn).on('click', function () {

            var gps = navigator.geolocation;

            if (gps) {
                gps.getCurrentPosition(
                        ACC.checkoutuselocation.positionSuccessStoresNearMe,
                        function (error) {
                            console.log("An error occurred... The error code and message are: " + error.code + "/" + error.message);
                        }
                );
            }

            return false;
        });
    },

    positionSuccessStoresNearMe: function (position) {
        console.log("#latitude: " + position.coords.latitude);
        console.log("#longitude: " + position.coords.longitude);

        $.ajax({
            url: $('#storelocator-url').val() + "?q=&latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&clickAndCollectOnly=true",
            method: 'GET',
            success: function (data) {
				//defined in scripts.js
            	doRenderStoreFinderResults(data);
               // ACC.checkoutuselocation.doRenderStoreFinderResults(data);
            },
            error: function (data) {
                $('#storeFinder-result').html('unable to find store');
            }
        });
    },

    doRenderStoreFinderResults: function (data) {
        var storeFinderResultDiv = $('#storeFinder-result');
        //storeFinderResultDiv.html('<div class="store_map" id="map_canvas"></div>');
        var dataArray = jQuery.parseJSON(data);
        var searchData = dataArray.response[0];
        var viewStoreText = $('#viewStoreText').val();
        var viewStoreUrl = $('#viewStoreUrl').val();
        var selectStoreUrl = $('#selectStoreUrl').val();
        var selectButtonText = $('#selectButtonText').val();
        var centerPoint = new google.maps.LatLng(searchData.latitude, searchData.longitude);
        var mapOptions = {
            zoom: 9,
            zoomControl: true,
            panControl: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: centerPoint
        }

        ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
        overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));

        /* Draw each store marker */
		markers.length = 0;
        $.each(searchData.results, function (i, item) {
            addStore(new google.maps.LatLng(item.geoPoint.latitude, item.geoPoint.longitude), item.storeSearchName, item.formattedDistance, item.address.line1, item.address.town, item.address.postalCode, viewStoreText, viewStoreUrl + item.url + "&candc=true", selectStoreUrl, true, CSRFToken, selectButtonText);
        });

        storeFinderResultDiv.html('').append(dataArray.response[1].storeListHtml).trigger('create');
        
		$('.view_map').click( function() {
			$('.active-tab-content',$tabContent).removeClass('active-tab-content');
			$('#mapCanvas',$tabContent).addClass('active-tab-content');
			google.maps.event.trigger(markers[$(this).attr('index')], 'click');
		});

        $(".storeFinderPageLink").bind({
            click: function (data) {
                data.preventDefault();
                $.ajax({
                    url: $('#storelocator-url').val() + data.target.search + "&q=" + escape($('#storelocator-query').val()),
                    method: 'GET',
                    success: function (data) {
                    	 ACC.checkoutuselocation.doRenderStoreFinderResults(data);
                    },
                    error: function (data) {
                        $('#storeFinder-result').html('unable to find store');
                    }
                });


            }
        });

    },

    viewStore: function () {
        $('.storeFinder-view-store').click(function () {
            $.ajax({
                url: $(this).data('url'),
                method: 'GET',
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    
                }
            });
        });
    }
    
    


}
;


$(document).ready(function () {
    ACC.checkoutuselocation.bindAll();
});