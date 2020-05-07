$(document).on('pageshow', '#body', function(){
	$('#body').css('visibility', 'visible');
	$('.loader').fadeOut('slow');
});

//find click and xollect store location url and ajax call

function findCCStores(url, type){
	var setType = type || 'form';
	var setUrl = url || $('#storelocator-url').val();
	var query = escape($('#storelocator-query').val());
	var longitude = escape($('#longitude').val());
	var latitude = escape($('#latitude').val());
	var construct = setUrl.indexOf('?') >= 0 ? '&' : '?';

	if (type === 'form') {
		setUrl += construct + 'q=' + query + "&clickAndCollectOnly=" + $('#storelocator-clickAndCollectOnly').is(':checked');
	} else {
		setUrl += construct + 'q=&longitude=' + longitude + '&latitude=' + latitude + "&clickAndCollectOnly=" + $('#storelocator-clickAndCollectOnly').is(':checked');
	}
	return setUrl;
};

function getCCStores(url, type){
	$.ajax({
		url: findCCStores(url, type),
		method: 'GET',
		success: function(data) {
				doRenderStoreFinderResults(data);
		},
		error: function(data) {
				$('#storeFinder-result').html('unable to find store');
		}
	});
}

$(document).ready(function() {

	$('#body').trigger('pageshow');


/************************************Show/ Hide Toggle**************************************************/

	$('#showPromo').click(function() {
	    $('.basketPromoHolder').slideToggle("fast");
	    $('#showPromo span').toggleClass('minus')
	});

	if($('.basketPromoHolder .form_field_error').length > 0) {
		$('.basketPromoHolder').show();
	}

	if( !$.trim( $('#globalMessages').html() ).length ) {
	    $('#globalMessages').css("display", "none");
	}

    $("#top-nav-bar-search").click(function(){
        $(this).toggleClass( "selected" );
        $('html,body').scrollTop();
	});

/************************************ Star ratings **************************************************/
	var $marker=$('.bv-rating-box').each(function(){
		var $marker=$(this);
		var to=0;
		var listener=setInterval(function(){
			to+=20;

			if (to>=5000 ||$marker.html()!='') {
				clearInterval(listener);
				$('.bv-rating-label').each(function(){
					var $me=$(this);
					if (parseInt($me.html().replace(/.*([0-9]+).*/,'$1'))>0) {
						$me.parents('.bv-stars-container').addClass('bv-stars-on');
					}
					if ($me.html().indexOf('(0)')==-1){
						$me.parents('.bv-rating-box').show();
					} else {
						$me.parents('.bv-rating-box').hide();
					}
				});
			}
		},20);

	});

  /************************************ Address Lookup **************************************************/


	var getSelectedOption = function() {
		var context = $('.addressResults').find(':selected');
		var selectedItem = [{
				houseNameOrNumber : context.data('attrHousenameornumber'),
				line1 : context.data('attrLine1'),
				line2 : context.data('attrLine2'),
				town : context.data('attrTown'),
				postalCode : context.data('attrPostalcode')
		}];

	return selectedItem;
	};

	var changeFields = function(result, edit) {
		if(edit) {
		$('#editAddressHouseNameOrNumber').val(result.houseNameOrNumber).trigger('change');
		$('#editAddressHouseNumberOrName').val(result.houseNameOrNumber).trigger('change');
		$('#editAddressLine1').val(result.line1).trigger('change');
		$('#editAddressLine2').val(result.line2).trigger('change');
		$('#editAddressTownCity').val(result.town).trigger('change');
		} else {
		$('#addressDeliveryhouseNameOrNumber').val(result.houseNameOrNumber).trigger('change');
		$('#addressDeliveryhouseNumberOrName').val(result.houseNameOrNumber).trigger('change');
		$('#addressDeliveryLine1').val(result.line1).trigger('change');
		$('#addressDeliveryLine2').val(result.line2).trigger('change');
		$('#addressDeliveryTownCity').val(result.town).trigger('change');
		}
	};

	var singleResult = function(item) {
		var line2 = item.line2 !== null && item.line2.length > 0 ? item.line2 + ',</br>' : '';
		var address = '<p><strong>' + item.houseNameOrNumber + ' ' + item.line1 + '</strong>,</br>' +
									line2 + item.town + ',</br>' +
									'<span class=\'text--uppercase\'>' + item.postalCode + '</span></p>';
		return address;
	};

	var multiResult = function(items, myaccount) {
	var options;

	for (i = 0; i < items.length; i++) {
		options += '<option class=\'address-row\'' +
					'data-attr-houseNameorNumber=\'' + items[i].houseNameOrNumber +'\'' +
					'data-attr-line1=\'' + items[i].line1 +'\'' +
					'data-attr-line2=\'' + items[i].line2 +'\'' +
					'data-attr-town=\'' + items[i].town +'\'' +
					'data-attr-postalcode=\'' + items[i].postalCode +'\'>' +
					items[i].houseNameOrNumber + ' ' + items[i].line1 +
					'</option>';
	};

	var addressOptions = '<div class=\'addressOption ln-c-form-group ln-u-push-bottom\'>' +
							'<label class=\'ln-c-label\'>Select address <span class=\'ln-c-label__info\' aria-hidden=\'true\'>*</span></label>' +
							'<select class=\'ln-c-select\' id=\'addressListView\'>' +
								'<option class=\'address-row\' value=\'\'>Please select</option>' +
								options +
							'</select>' +
						'</div>';

	var addressOptionsMyAccount = '<div class=\'addressBookTitleField ln-c-form-group ln-u-push-bottom\'>' +
							'<label class=\'ln-c-label\'>Select address <span class=\'ln-c-label__info\' aria-hidden=\'true\'>*</span></label>' +
							'<select class=\'ln-c-select\' id=\'addressListView\'>' +
								'<option class=\'address-row\' value=\'\'>Please select</option>' +
								options +
							'</select>' +
						'</div>';

	var optionType = myaccount ? addressOptionsMyAccount : addressOptions;

	return optionType;
};

var addressResults = function(results, myaccount) {
    var lth = results.length;
	if (lth === 1){
	changeFields(results[0], false);
	return singleResult(results[0]);
	} else if (lth > 1) {
	return multiResult(results, myaccount);
	} else {
	return '<p class=\'tu-u-color-red\'>Please enter a valid postcode</p>';
	}
};

var emptyAddress = function(edit) {
	if (edit) {
		$('#editAddressLine1').val('').trigger('change');
		$('#editAddressLine2').val('').trigger('change');
		$('#editAddressTownCity').val('').trigger('change');
	} else {
		$('#addressDeliveryLine1').val('').trigger('change');
		$('#addressDeliveryLine2').val('').trigger('change');
		$('#addressDeliveryTownCity').val('').trigger('change');
		};
	};

	var getAddresses = function(data, myAccount, buttonNode) {
		var url = '/checkout/multi/home-delivery/find-address-json';
		$('.lookupAddressFields').hide();
		$('.addressResultsSpinner').hide();
		$('.addressResults').hide();
		$('.manual',$('.showHideDiv')).show();
		$('.searchPostcodeLnk',$('.showHideDiv')).hide();
		$.ajax({
				url: url,
				method:'POST',
				dataType:'json',
				data: data,
				beforeSend: function() {
					$('.addressResultsSpinner').show();
					emptyAddress(false);
					buttonNode.disabled = true;
				},
				success: function (response) {
					$('.addressResults').html(addressResults(response, myAccount));
					$('.addressResultsSpinner').hide();
					$('.addressResults').slideDown();
					$('#addressListView').on('change', function() {
							$('.addressResults').html(addressResults(getSelectedOption(this), myAccount));
					});
				},
				error: function(response) {
					$('.addressResults',that).html('<p class="error">unable to find address</p>');
				},
				complete: function() {
					buttonNode.disabled = false;
				}
			});
	};

	var hideShowManualForm = function(manual) {
		var line1 = $('#addressDeliveryLine1').length > 0 ? $('#addressDeliveryLine1') : $('#editAddressLine1'),
				city = $('#addressDeliveryTownCity').length > 0 ? $('#addressDeliveryTownCity') : $('#editAddressTownCity');

		line1.attr('required', manual);
		city.attr('required', manual);
	$('.lookupAddressFields').slideToggle(400);
		$('.addressResults').slideToggle(300);

		if(manual){
			$('.addressLookup .searchPostcodeLnk').show();
		}else{
			$('.addressLookup .manual').show();
			$('#addressPostcode').focus();
		}
	};

    $('#addEditAddress, #tuPaymentDetailsForm, #tuAddressForm').find('.address-lookup').on('click', function(ev) {
			ev.preventDefault();

			 var $target=$(ev.target),
			 		 that=this,
				 	 postcode = $('#address_postcode').length > 0 ? $('#address_postcode').val() : $('input#addressPostcode').val(),
			     namenumber = $('#addressDeliveryhouseNumberOrName').length > 0 ? $('#addressDeliveryhouseNumberOrName').val() : $('input#addressDeliveryhouseNameOrNumber').val(),
					 myAccount = $('#addressDeliveryhouseNumberOrName').length > 0 ? true : false;

			if (postcode.length > 0) {
				getAddresses({postcode: postcode, houseNameOrNumber: namenumber}, myAccount, $target[0]);
			} else {
			  $('.addressResults').html('<p class="error tu-u-color-red">Please enter a postcode</p>');
			}
 		});

    if( $('.information_message.negative','#add-address-content').length ) {
      $(".lookupAddressFields").show();
    };

	$('#tuAddressForm').find('.change_address_button').on('click', function(ev) {

		var $target=$(ev.target),
				postcode = $('#address_postcode').length > 0 ? $('#address_postcode').val() : $('input#addressPostcode').val(),
			line1 = $('#addressDeliveryLine1').length > 0 ? $('#addressDeliveryLine1').val() : $('#editAddressLine1').val(),
				city = $('#addressDeliveryTownCity').length > 0 ? $('#addressDeliveryTownCity').val() : $('#editAddressTownCity').val(),
				addressFields = $('.lookupAddressFields').is(':visible');

		if (postcode.length > 0  && (line1.length === 0 || city === 0) && !addressFields) {
			ev.preventDefault();
			$('#tuAddressForm .address-lookup').trigger('click');
		};
	});

		$('.addressLookup .manual ').on('click', function(e) {
	    e.preventDefault();
			hideShowManualForm(true);
	    $(this).hide();
	  });

	  $('.addressLookup .searchPostcodeLnk').on('click', function(e) {
	    e.preventDefault();
			hideShowManualForm(false);
			$(this).hide();
	  });


/************************************ Checkout Delivery **************************************************/

$('#storeFinder').click(function(ev) {
	$('#longitude').val('');
	$('#latitude').val('');
	$('#store-tabs').show();
	getCCStores($('#storelocator-url').val(), 'form');
});

var center;
function calculateCenter() {
  center = map.getCenter();
}

$(window).load(function(){
 google.maps.event.trigger(window, 'resize', {});
});

var lookupNavigation = $('#lookupNavigation');
var lookupMapData;
var searchResult = $('#searchResultContent');

lookupNavigation.on('click','a', function(e) {
	e.preventDefault();
	var currentItem = $(this);
	var lookupType = currentItem.attr('id');

	if(!currentItem.hasClass('active')) {
		lookupNavigation.find('.active').removeClass('active');
		currentItem.addClass('active');
		showHideStoreLookup(lookupType);
	}
});

function showHideStoreLookup(lookupType) {
	$(searchResult).toggleClass('lookupMapView');

	if(lookupType === 'lookupMapView'){
		doRenderStoreMap();
	}

	$('html, body').animate({
			scrollTop: $("#searchResultContent").offset().top
	}, 400);
}

function doRenderStoreMap() {
	var viewStoreText = $('#viewStoreText').val();
	var viewStoreUrl = $('#viewStoreUrl').val();
	var selectStoreUrl = $('#selectStoreUrl').val();
	var selectButtonText = $('#selectButtonText').val();
	var centerPoint = new google.maps.LatLng(lookupMapData.latitude, lookupMapData.longitude);
	var mapOptions = {
		zoom: 9,
		zoomControl: true,
		panControl: true,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: centerPoint
	};

	ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
  overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));

	if (typeof lookupMapData != 'undefined' && lookupMapData.results.length > 0) {
    $('#mapCanvas').css('height', 'auto');
    $('#selectStoreBtnId').removeClass('hidden-button');
	} else {
    $('#mapCanvas').css('height', '0');
    $('#selectStoreBtnId').addClass('hidden-button');
	}

	/* Draw each store marker */
	markers.length = 0;
	$.each(lookupMapData.results, function(i, item) {
		addStore(new google.maps.LatLng(item.geoPoint.latitude, item.geoPoint.longitude), item.storeSearchName, item.formattedDistance, item.address.line1, item.address.town, item.address.postalCode, viewStoreText, viewStoreUrl + item.geoMapUrl, selectStoreUrl, true, CSRFToken, selectButtonText, item.otherName);
	});
};

function doGetStoreDetails(url, callback) {
	$.ajax({
		url: url,
		method:'GET',
		success: function (data) {
			callback(data);
		},
		error: function (data) {
			callback(data);
		}
	});
};

function doRenderStoreFinderResults(data) {
	var dataArray = jQuery.parseJSON(data);
	var searchData = dataArray.response[0];
	var storeLocationResults = $('#searchResultContent');
	lookupMapData = searchData;
	storeLocationResults.addClass('show-search-results');

	$('#storeFinder-result').html('').append(dataArray.response[1].storeListHtml);
	$(document).trigger('clickCollectListLoaded');
	doRenderStoreMap();

	$('#storeFinder-result .locationPin').click( function(e) {
		e.preventDefault();
		google.maps.event.trigger(markers[$(this).attr('index')], 'click');
	});

	$("#storeFinder-result .storeFinderPageLink").bind({
	  click: function(data) {
			data.preventDefault();
			var locatorUrl = $('#storelocator-url').val() + data.target.search;
			var searchType = !$('#longitude').val() && !$('#latitude').val() ? 'form' : 'geolocation';
			getCCStores(locatorUrl, searchType);
	  }
	});

}

	$('#selectStoreBtnId').on('click', function() {
		$('#selectStoreFormId').submit();
	});

	//fix for use current location for click and collect
	if (!window.doRenderStoreFinderResults)
		window.doRenderStoreFinderResults=doRenderStoreFinderResults;


/************************************ Checkout Delivery Sections **************************************************/

	if ($("form.editexistingaddress").length) {
			$('.editexistingaddress .deliveryOptionLabel').addClass("active-label");
			$('.editexistingaddress .deliveryContent').show();
			$(".lookupAddressFields").show();
			$("span.manual").hide();
			$("span.searchPostcodeLnk").show();
	};

	// PDP scrzoom

	function initWriteReviewAction() {
	$('#write_review_action_main').click(function(e){
		e.preventDefault();
		$.scrollTo('#prod_tabs', 300, {axis: 'y'});
		$('#reviews').hide();
		$('#write_reviews').show();
		$( "#prod_tabs" ).tabs( "option", "selected", $('#tab_strip').children().size() - 1 );
		$('#reviewForm input[name=headline]').focus();
	});
}

initWriteReviewAction();


	/************************************ Force open the billing address page on error ***********************************/


	  if($("#editAddressBlock .form_field_error").length > 0) {
		  $("#editAddressBlock").css("display","block");
		  $(".lookupAddressFields").css("display","block");
	  };

/************************************ Update on change select box ******************************/

		$('.quantityCart').change(function(){
				$(this).closest('form').find('.quantityCartUpdateMessage').css('display','block');
		});
/************************************ Hide additional Nectar error message on registration ***************************/

		if($('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 8 digits")').length >0)  {
			$('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 3 digits")').css('display', 'none');
			$('.nectarErrorCode.nectar_two .formErrorIcon').css('display', 'none');
			$('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 8 digits")').css('display', 'block');
	} else if($('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 3 digits")').length >0)  {
			$('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 8 digits")').css('display', 'none');
			$('.nectarErrorCode.nectar_one .formErrorIcon').css('display', 'none');
			$('.nectarErrorCode .form_field_error .form_field_error-message span:contains("Please enter 3 digits")').css('display', 'block');
	};

		/************************************ Force open the address fields on the billing page if no one line error ***********/
						  if($('#newLine1').hasClass('input-error')) {
							  $('.lookupAddressFields').css('display','block');
							  };

		/************************************ Switch focus on nectar card input on registration *******************************/


							  $("#regNectarPointsOne").on('input',function () {
								    if($(this).val().length == $(this).attr('maxlength')) {
								        $("#regNectarPointsTwo").focus();
								    }
								});

		/************************************ Red border on error and Error states **********************************************/

					  /* Nectar Card field */
							  if($('.nectarErrorCode div').hasClass('form_field_error')) {
				  				$('#regNectarPointsOne').css('border', '1px solid #C00C0C');
				  				$('#regNectarPointsTwo').css('border', '1px solid #C00C0C');
							  };

							  /* Billing mobile */
							  /* C&C */
							  if($('.clickAndCollectContactNumber div').hasClass('form_field_error')) {
				  				$('#clickAndCollectNumber').css('border', '1px solid #C00C0C');
							  };

							  /* T&C */
							  if($('.billingTerms div').hasClass('form_field_error')) {
								$('.billingTerms .form_field_error .formErrorIcon').css({ 'position' : 'relative' , 'bottom' : '35px',  'left' : '245px'});
								$('.billingTerms .form_field_error').css({ 'position' : 'relative' , 'top' : '40px', 'right' : '33px'});
								$('label.billingtandcmobile').css({ 'position' : 'relative' , 'bottom' : '82px',  'left' : '40px' , 'z-index' : '2'});
							  };
							/* Delivery Address */
							if($('#DeliveryAddressForm input').hasClass('input-error')) {
								$('#DeliveryAddressForm input.input-error').css('border', '1px solid #C00C0C');
							};
							if($('#DeliveryAddressForm .deliveryTitleSelect div.form_field_error-message').is(':visible')) {
								$('#DeliveryAddressForm .deliveryTitleSelect .ui-select .ui-btn').css('border', '1px solid #C00C0C');
								$('#DeliveryAddressForm .deliveryTitleSelect .ui-select .ui-icon').css('border-left', '1px solid #C00C0C');
							};
							if($('#DeliveryAddressForm .deliveryFirstName div.form_field_error-message').is(':visible')) {
								$('#DeliveryAddressForm .deliveryFirstName .form_field-input input').css('border', '1px solid #C00C0C');
							};
							if($('#DeliveryAddressForm .deliveryLastName div.form_field_error-message').is(':visible')) {
								$('#DeliveryAddressForm .deliveryLastName .form_field-input input').css('border', '1px solid #C00C0C');
							};
							/* Registration form */
							if($('.registerTitle div.form_field_error').is(':visible')) {
								$('.registerTitle .ui-btn-inner').css('border', '2px solid #C00C0C');
								$('.registerTitle .ui-btn-inner .ui-icon-arrow-d').css('border-left', '2px solid #C00C0C');
							};
							if($('#tuRegisterForm .registerFirstName div.form_field_error').is(':visible')) {
								$('#tuRegisterForm .registerFirstName input').css('border', '2px solid #C00C0C');
							};
							if($('#tuRegisterForm .registerLastName div.form_field_error').is(':visible')) {
								$('#tuRegisterForm .registerLastName input').css('border', '2px solid #C00C0C');
							};
							if($('#tuRegisterForm .registerEmail div.form_field_error').is(':visible')) {
								$('#tuRegisterForm .registerEmail input').css('border', '2px solid #C00C0C');
							};
							if($('#tuRegisterForm .registerPassword div.form_field_error').is(':visible')) {
								$('#tuRegisterForm .registerPassword input').css('border', '2px solid #C00C0C');
							};
							if($('#tuRegisterForm .registerPasswordCheck div.form_field_error').is(':visible')) {
								$('#tuRegisterForm .registerPasswordCheck input').css('border', '2px solid #C00C0C');
							};
							/* Promo codes errors */
							if($('#tuApplyVoucherForm div').hasClass('form_field_error')) {
								$('#tuApplyVoucherForm input.input-error').css('border', '1px solid #C00C0C');
							};
							/* Login errors */
							if($('#loginForm .form_field_error .form_field_error-message p').hasClass('errorTextLogin')) {
								$('#loginForm input').css('border', '1px solid #C00C0C');
								//$('.loginPasswordLabel label').css({'position' : 'relative','right' : '35px'});
							};
							/* Guest Register after checkout */
							if($('#tuGuestRegisterForm div').hasClass('form_field_error')) {
								$('#tuGuestRegisterForm input').css('border', '1px solid #C00C0C');
							};
							/* Update My Account Profile Details Erorrs */
							if($('#tuUpdateProfileForm .accountTitle div.form_field_error-message').is(':visible')) {
								$('#tuUpdateProfileForm .accountTitle input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateProfileForm .accountFirstName div.form_field_error-message').is(':visible')) {
								$('#tuUpdateProfileForm .accountFirstName input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateProfileForm .accountLastName div.form_field_error-message').is(':visible')) {
								$('#tuUpdateProfileForm .accountLastName input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateProfileForm .accountContact div.form_field_error-message').is(':visible')) {
								$('#tuUpdateProfileForm .accountContact input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateProfileForm .accountMobile div.form_field_error-message').is(':visible')) {
								$('#tuUpdateProfileForm .accountMobile input').css('border', '1px solid #C00C0C');
							};
							/* Update My Account Email Erorrs */
							if($('#tuUpdateEmailForm .accountEmailCurrent div.form_field_error-message').is(':visible')) {
								$('#tuUpdateEmailForm .accountEmailCurrent input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateEmailForm .accountEmailNew div.form_field_error-message').is(':visible')) {
								$('#tuUpdateEmailForm .accountEmailNew input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateEmailForm .accountEmailCheck div.form_field_error-message').is(':visible')) {
								$('#tuUpdateEmailForm .accountEmailCheck input').css('border', '1px solid #C00C0C');
							};
							if($('#tuUpdateEmailForm .accountEmailPassword div.form_field_error-message').is(':visible')) {
								$('#tuUpdateEmailForm .accountEmailPassword input').css('border', '1px solid #C00C0C');
							};
							/* Update My Account Password Erorrs */
							if($('#updatePasswordForm .accountChangePasswordCurrent div.form_field_error-message').is(':visible')) {
								$('#updatePasswordForm .accountChangePasswordCurrent input').css('border', '1px solid #C00C0C');
							};
							if($('#updatePasswordForm .accountChangePasswordNew div.form_field_error-message').is(':visible')) {
								$('#updatePasswordForm .accountChangePasswordNew input').css('border', '1px solid #C00C0C');
							};
							if($('#updatePasswordForm .accountChangePasswordCurrent div.form_field_error-message').is(':visible')) {
								$('#updatePasswordForm .accountChangePasswordCurrent input').css('border', '1px solid #C00C0C');
							};
							/* Address form */
							if($('#tuAddressForm input').hasClass('input-error')) {
								$('#tuAddressForm input.input-error').css('border', '1px solid #C00C0C');
							};
							if($('#tuAddressForm .addressBookTitleField div.form_field_error-message').is(':visible')) {
								$('#tuAddressForm .addressBookTitleField .ui-select .ui-btn').css('border', '1px solid #C00C0C');
								$('#tuAddressForm .addressBookTitleField .ui-select .ui-icon').css('border-left', '1px solid #C00C0C');
							};
							if($('.information_message.negative:contains("Error promotion code not valid")').length > 0)  {
								$('#globalMessages').css('height','55px');
								$('.page-mobile-cartPage #globalMessages .negative').css('min-height','55px');
							}



/********************************* Undeliverable post code error message positioning **************************************************/
 if($('.page-mobile-multiStepCheckoutSummaryPage .postcodeInput .form_field_error-message span:contains("unable to deliver to this postcode")').length > 0)  {
	 $('.page-mobile-multiStepCheckoutSummaryPage .postcodeInput .form_field_error-message span').css({'display': 'block' , 'clear' : 'both' , 'position' : 'relative' , 'top' : '10px'});
	$('.page-mobile-multiStepCheckoutSummaryPage #DeliveryAddressForm .addressLookup .showHideDiv').css('height' , '90px');
 }

 $('#addToCartButton').click(function() {
		var option = $('#Size').find('option:selected').val();
		var qty = $('#qty option:selected').val();
		if(option === 'pickSize'){
			  $('.sizeBox .form_field_error-message').css('display' , 'block');
			  $('.size-guide').css({'left' : '225px'});
			  $('.sizeBox .ui-select .ui-btn').css('border', '1px solid #C00C0C');
			  $('.sizeBox .ui-select .ui-icon').css('border-left', '1px solid #C00C0C');
			  $('.prod_add_to_cart').css('margin-top' , '-50px');
			  $('#addToCartConfirm').css("display", "none");
			  $('.qtyErrorMessage').hide();
		 } else if($('#maxQntyExceeded').is(":visible")) {
					$('#addToCartConfirm').css("display", "none");
			} else {
				$('#addToCartConfirm').css('display' , 'block');
				if(qty >= '1') {
					$('.sizeErrorMessage').hide();
					$('.qtyErrorMessage').hide();
				};
		   }
	 });


 /********************************* Error message positioning Checkout page **************************************************/
 if($('.page-mobile-multiStepCheckoutSummaryPage #globalMessages .negative:contains("Failed to place the order")').length > 0)  {
	$('.page-mobile-multiStepCheckoutSummaryPage #globalMessages').css('display' , 'none');
 };
 if($('.page-mobile-multiStepCheckoutSummaryPage #globalMessages .negative:contains("Failed to create subscription")').length > 0)  {
		$('.page-mobile-multiStepCheckoutSummaryPage #globalMessages').css('display' , 'none');
	 };



/******************** Clear all Search refinement PLP  ******************************************/

	 function validPostcode(postcode) {
	    postcode = postcode.replace(/\s/g, "");
	    var regex = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
	    return regex.test(postcode);
	  }

	  function addValidator(name, validator) {
	    jQuery.validator.addMethod(name, function(value, element) {
	      return validator(value);
	    });
	  }

	  addValidator("validPostcode", validPostcode);


// Document Ready Ends
}); //end of $.ready()
//
//
// Document Ready Ends
//
//

$('#changeAddress').click(function(){
	$.ajax({
		url: "/checkout/multi/change-payment-address?selectedAddressId="+ escape($( "#selectedEditAddressValue" ).val()) + "&editAddressId=" + escape($( "#editAddressCodeConfig" ).val()),
		method:'GET',
		dataType:'html',
		success: function (html) {
			location.reload(true);
		},
		error: function (data) {
			console.log("error");
		}
	});
})



	/************************************************** Strip + from phone numbers on store locator **********************/

	//Store Finder results page
	$('.storePhone').each(function() {
		  var value = $(this).attr('href');
		  $(this).attr('href', value.replace(/\+/g, ''));
		});
	// Store details page
	$('.phone').each(function() {
		  var value = $(this).attr('href');
		  $(this).attr('href', value.replace(/\+/g, ''));
		});



	/**************************************************  Scroll to top  **************************************************/

	$("a[href='#top']").click(function() {
		  $("html, body").animate({ scrollTop: 0 }, "slow");
		  return false;
		});

/************************************************ Item Removed from Basket Notification *********************************/

	if($('ul li:contains("Unfortunately")').length >0)  {
		$('ul li').addClass('itemsRemoved');
		$('ul li').prepend('<span class="itemsRemoved icon"></span>');
		$('ul.header_nav li, #slidein ul li, ul.priceList li, .basketOrderTotalsLeft ul li').removeClass('itemsRemoved');
		$('ul.header_nav li span.itemsRemoved.icon, #slidein ul li span.itemsRemoved.icon, ul.priceList li span.itemsRemoved.icon, .basketOrderTotalsLeft ul li span.itemsRemoved.icon').remove();
	};

$(window).load(function() {
	/* Fires after document ready*/

	/* guest login in focus on error */
	if($('.register-error').hasClass('guestLoginField')) {
		$('html, body').animate({
			scrollTop: $(".checkoutRegisterFormSeparator").offset().top
		}, 100);
		$('.page-mobile-checkout-login #guestForm input#guest_email').focus();
		$('.page-mobile-checkout-login #guestForm input#guest_email').css('border', '1px solid #C00C0C');

	};
});
