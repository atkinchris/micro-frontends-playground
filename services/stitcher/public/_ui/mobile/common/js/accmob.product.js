ACCMOB.product = {

	redirect: function (url)
	{

		if (url.indexOf("http://") == -1)
		{
			url = "http://" + url;
		}
		window.location = url;
	},

	initializeVariantSelectors: function (variantSelectorElement)
	{

		variantSelectorElement.change(function ()
		{
			if ($(this).val() != "")
			{
				var url = $(location).attr('host') + $(this).val();
				ACCMOB.product.redirect(url);
			}
		});

	},

	toggleSubmitButtonState: function (state) {
		// Enable/Disable submit (Add to Basket) button
		document.getElementById('AddToCart').disabled = state;
	},

	displayAddToCartOverlay: function (cartResult, statusText, xhr, formElement)
	{
		try {
      ACCMOB.product.toggleSubmitButtonState(false);
			var products= cartResult.cartData.products,
				count=0,
				maxQntyExceeded=cartResult.cartData.maxQntyExceeded;

			for (var i=0;i<products.length;i++)
				count+=parseInt(products[i].qty);

			$('#minicart_data .ui-btn-text').html(count);
			var setCount = count.toString();
			window.mobileNavigation ? window.mobileNavigation.updateItemCount(count.toString()) : null;
			//ST-1323
			$('#minicart_data').attr("href", ACCMOB.config.contextPath+"/cart");

			if(maxQntyExceeded == 'yes') {
				$('#maxQntyExceeded').css("display", "block");
				$('#addToCartConfirm').css("display", "none");
				$('#insufficientStock').css("display", "none");
			} else if(cartResult.cartData.insufficientStock == 'yes') {
				$('#maxQntyExceeded').css("display", "none");
				$('#insufficientStock').css("display", "block");
				$('#addToCartConfirm').css("display", "none");
			} else {
				$('#maxQntyExceeded').css("display", "none");
				$('#insufficientStock').css("display", "none");
				$('#addToCartConfirm').css("display", "block");
				setTimeout(function() {$('#addToCartConfirm').css("display", "none")},3000);
			}
		}
    catch (ex) {
      console.warn(ex);
      ACCMOB.product.toggleSubmitButtonState(false);
    }
	},

	initAddToCart: function ()
  {
    var addToCartForm = $('.add_to_cart_form');
    addToCartForm.ajaxForm({
      beforeSubmit: function () { ACCMOB.product.toggleSubmitButtonState(true); },
      success: ACCMOB.product.displayAddToCartOverlay,
      error: function () { ACCMOB.product.toggleSubmitButtonState(false); }
    })
  },

    notAllowAddToCart: function(){
        $('.notAllowAddToCart').bind("tap click", function(){
            $('#Size').addClass('form_field_error');
            $('#qty').addClass('form_field_error');
        });
    },

	initialize: function ()
	{
		with (ACCMOB.product)
		{
			initializeVariantSelectors($(".variantSelector"));
			initAddToCart();
            notAllowAddToCart();
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.product.initialize();
});
