ACC.removepayment = {

	bindAll: function ()
	{
		this.bindRemovePaymentDetails();
		this.clearNectarAndAddNewValue();
	},

	bindRemovePaymentDetails: function ()
	{
		$('.submitRemove').on("click", function ()
		{
			$('#removePaymentDetails' + $(this).attr('id')).submit();
		});
		$('.submitSetDefault').on("click", function ()
		{
			$('#setDefaultPaymentDetails' + $(this).attr('id')).submit();
		});
	},

	clearNectarAndAddNewValue: function(e) {

		$('.nectarHidden1').on('click', function () {
			$('#nectarHidden2').show();
			$('#nectarHidden1').hide();
		});

		$('.removeButton').on('click', function (e) {
			e.preventDefault();
      $('#regNectarPointsTwo').val('');
			$('#nectarHidden2').hide();
			$('#nectarHidden1').show();
			$('#nectarHidden3').show();
		});
	}

};

$(document).ready(function ()
{
	ACC.removepayment.bindAll();
});
