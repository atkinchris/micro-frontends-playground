ACCMOB.cart = {

	bindCycleFocusEvent: function ()
	{
		$('#lastInTheForm').blur(function ()
		{
			$('#tuPaymentDetailsForm [tabindex$="10"]').focus();
		})
	},

	updateBillingAddressForm: function ()
	{
		var editMode = ("true" == $('#newBillingAddressFields').attr('edit-mode'));
		var newAddress = $('#differentAddress').attr("checked");

		if (editMode || newAddress)
		{
			$("#newBillingAddressFields :input").removeAttr('disabled');
		}
		else
		{
			$("#newBillingAddressFields :input").attr('disabled', 'disabled');
		}
	},

	clickDifferentAddress: function ()
	{
		$("#differentAddress").click(function ()
		{
			var differentAddress = $("input:checkbox[id='differentAddress']:checked").val();
			if (differentAddress)
			{
				$('#addBillingAddressForm').removeAttr('style');
				$('#addBillingAddressForm').trigger('expand');
			}
			else
			{
				$('#addBillingAddressForm').attr('style', 'display:none');
				$('#addBillingAddressForm').trigger('collapse');
			}
		})
	},

	bindToQuantitySelector: function ()
	{
		$('.quantitySelector').on("change", function ()
		{
			$('#updateCartForm' + $(this).attr('entryNumber')).get(0).submit();
		});
	},

	bindPlaceOrderWithSecurityCodeButton: function ()
	{
		$('.placeOrderWithSecurityCode').on("click", function ()
		{
			var securityCode = $("#SecurityCode").val();
			$(".securityCodeClass").val(securityCode);
			$("#placeOrderForm1").submit();
		});
	},

	bindToCvv2DescriptionLink: function ()
	{
		$('#cvv2Description').on("click", function ()
		{
			event.preventDefault();
		});
	},

	bindToRadioButtons: function ()
	{
		$('input[type="radio"]').on("click", function ()
		{
			this.checked = true;
		});
	},

	bindToggleItemsButton: function (buttons)
	{
		var remainingItemsSelector = "li.cartLi:first ~ li.cartLi";
		var buttonTextWrapper = "span > span";

		$.each(buttons, function (index, buttonElement)
		{
			var button = $(buttonElement)
			var itemsToHide = button.parent("li").siblings(remainingItemsSelector);

			if (itemsToHide.length > 0)
			{
				itemsToHide.hide();

				button.click(function (event)
				{
					event.preventDefault();
					// toggle all items except first
					$(this).parent("li").siblings(remainingItemsSelector).toggle();
					// swap button text
					var toggleText = $(this).data("toggleText");
					$(this).data("toggleText", $(this).find(buttonTextWrapper).text());
					$(this).find(buttonTextWrapper).text(toggleText);
				});
			}
			else
			{
				button.hide();
			}
		});
	}
};

$(document).ready(function ()
{
	with (ACCMOB.cart)
	{
		updateBillingAddressForm();
		clickDifferentAddress();
		bindCycleFocusEvent();
		bindToQuantitySelector();
		bindPlaceOrderWithSecurityCodeButton();
		bindToCvv2DescriptionLink();
		bindToRadioButtons();
		bindToggleItemsButton($(".toggleItemsButton"));
	}

});
