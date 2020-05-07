ACC.checkout = {
	spinner: $("<img id='taxesEstimateSpinner' src='" + ACC.config.commonResourcePath + "/images/spinner.gif' />"),

	bindAll: function ()
	{
		this.bindCheckO();
	},

	bindCheckO: function ()
	{
		//var cartEntriesError = false;
		$('.doCheckoutBut').click(function (ev)
		{
			/*
			cartEntriesError = ACC.pickupinstore.validatePickupinStoreCartEntires();
			if (!cartEntriesError)
			{
				window.location = checkoutUrl;
			}
			return false;
			*/
			ev.preventDefault();
			window.location = checkoutUrl;
		});
		return;


		// Alternative checkout flows options
		$('.doFlowSelectedChange').change(function ()
		{
			if ('multistep-pci' == $('#selectAltCheckoutFlow').attr('value'))
			{
				$('#selectPciOption').css('display', '');
			}
			else
			{
				$('#selectPciOption').css('display', 'none');

			}
		});

		$('#estimateTaxesButton').click(function ()
		{
		    $('#zipCodewrapperDiv').removeClass("form_field_error");
            $('#countryWrapperDiv').removeClass("form_field_error");
            $('div#selectAValidZipCode').hide();
            $('div#selectAValidCountry').hide();


			if ($('#zipCode').val() == "")
            {
            	$('div#selectAValidZipCode').show().focus();
            	$('#zipCodewrapperDiv').addClass("form_field_error")
            } else if ($('#countryIso').val() == "")  {
            	$('div#selectAValidCountry').show().focus();
                $('#countryWrapperDiv').addClass("form_field_error")
            } else {
            	$("#order_totals_container").append(ACC.checkout.spinner);
				$.getJSON("cart/estimate", {zipCode: $('#zipCode').val(), isocode: $('#countryIso').val()  }, function(estimatedCartData) {
			  				$("#estimatedTotalTax").text(estimatedCartData.totalTax.formattedValue)
			  				$("#estimatedTotalPrice").text(estimatedCartData.totalPrice.formattedValue)
                			$(".estimatedTotals").show();
                			$(".realTotals").hide();
                			$("#taxesEstimateSpinner").remove();

			  	});


			}
   		});
	}

};

function submitEditDeliveryAddressForm(deliveryAddressId, deliveryModeCode)
{
    $('input[id=editAddressCode]').val(deliveryAddressId);
    $('input[id=delivery_method]').val(deliveryModeCode);
    $('form[id=editDeliveryAddress]').submit();
};

$(document).ready(function ()
{
	ACC.checkout.bindAll();
});
