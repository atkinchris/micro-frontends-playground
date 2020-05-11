ACC.placeorder = {

	bindAll: function ()
	{
		this.bindPlaceOrder();
		this.updatePlaceOrderButton();
		this.bindSecurityCodeWhatIs();
	},

	bindPlaceOrder: function ()
	{
		$(".placeOrderWithSecurityCode").on("click", function ()
		{
			ACC.common.blockFormAndShowProcessingMessage($(this));
			$(".securityCodeClass").val($("#SecurityCode").val());
			$("#placeOrderForm1").submit();
		});


		$("#Terms1").on("click", function ()
		{
			$("#Terms2").attr("checked", $("#Terms1").is(":checked"));
		});

		$("#Terms2").on("click", function ()
		{
			$("#Terms1").attr("checked", $("#Terms2").is(":checked"));
		});
	},

	updatePlaceOrderButton: function ()
	{
		var deliveryAddress = $("#checkout_summary_deliveryaddress_div").hasClass("complete");
		var deliveryMode = $("#checkout_summary_deliverymode_div").hasClass("complete");
		var paymentDetails = $("#checkout_summary_payment_div").hasClass("complete");

		if (deliveryAddress && deliveryMode && paymentDetails)
		{
			$(".place-order").removeAttr("disabled");
		}
		else
		{
			$(".place-order").attr("disabled", true);
		}
	},

	bindSecurityCodeWhatIs: function ()
	{
		$('.security_code_what').bt($("#checkout_summary_payment_div").data("securityWhatText"),
				{
					trigger: 'click',
					positions: 'bottom',
					fill: '#efefef',
					cssStyles: {
						fontSize: '11px'
					}
				});
	}
};

$(document).ready(function ()
{
	ACC.placeorder.bindAll();
});


