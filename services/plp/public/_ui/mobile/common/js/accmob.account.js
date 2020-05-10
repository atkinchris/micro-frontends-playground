ACCMOB.account = {

	bindToRemoveAddressButton: function ()
	{
		$('.removeAddressForm').on("submit", function (event)
		{
			if ($(this).data("removeConfirmed") == "true")
			{
				return true;
			}
			else
			{
				ACCMOB.common.preventDefault(event);
			}
		});

		$('.removeAddressButton').on("click", function (event)
		{
			var pid = $(this).attr("pid");
			var removePaymentCardForm = $("#removeAddressForm" + pid);
			ACCMOB.common.preventDefault(event);
		});


		$(document).on("click","#okRemoveAddress", function (e)
		{
			e.preventDefault();
			var pid = $('.removeAddressButton').attr("pid");
			var removePaymentCardForm = $("#removeAddressForm" + pid);
			removePaymentCardForm.data("removeConfirmed", "true");
			removePaymentCardForm.submit();
			return true;

		});

	},

	bindToRemovePaymentCardButton: function ()
	{
		/* prevent payment remove form from submitting normaly */
		$('.removePaymentCardForm').on("submit", function (event)
		{
			if ($(this).data("removeConfirmed") == "true")
			{
				return true;
			}
			else
			{
				ACCMOB.common.preventDefault(event);
			}
		});

		$('.removePaymentCardButton').on("click", function (event)
		{
			var pid = $(this).attr("pid");
			var removePaymentCardForm = $("#removePaymentCardForm" + pid);
			ACCMOB.common.preventDefault(event);
		});


		$(document).on("click","#okRemovePaymentCard", function (e)
		{
			e.preventDefault();
			var pid = $('.removePaymentCardButton').attr("pid");
			var removePaymentCardForm = $("#removePaymentCardForm" + pid);
			removePaymentCardForm.data("removeConfirmed", "true");
			removePaymentCardForm.submit();
			return true;

		});
	},

	bindToSetDefaultPaymentButton: function ()
	{
		$('.setDefaultPayment').on("click", function ()
		{
			$('#setDefaultPaymentDetails' + $(this).attr("pid")).submit();
			return false;
		});
	},

	bindToRemovePaymentDetailsButton: function ()
	{
		$('.removePaymentDetail').on("click", function ()
		{
			$('#removePaymentDetails' + $(this).attr("pid")).submit();
			return false;
		});
	},
	clearNectarAndAddNewValue: function ()
  {
		$('.nectarHidden1').on('click', function () {
			$('.nectarHidden3').css('display', 'inline');
			$('.nectarHidden1').show();
		});

		$('.removeButton').on('click', function (e) {
			e.preventDefault();
      $('#regNectarPointsOne').val('');
      $('#regNectarPointsTwo').val('');
			$('.nectarHidden3').css('display', 'inline');
			$('.nectarHidden1').css('display', 'block');
			$('.nectarHidden2').hide();
			$(this).hide();
		});
  },

	initialize: function ()
	{
		with (ACCMOB.account)
		{
			bindToRemoveAddressButton();
			bindToSetDefaultPaymentButton();
			bindToRemovePaymentCardButton();
			bindToRemovePaymentDetailsButton();
			clearNectarAndAddNewValue();
		}
	}

};

$(document).ready(function ()
{
	ACCMOB.account.initialize();
});
