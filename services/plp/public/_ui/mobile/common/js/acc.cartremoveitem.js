ACC.cartremoveitem = {

	bindAll: function ()
	{
		this.bindCartRemoveProduct();
	},
	bindCartRemoveProduct: function ()
	{
		// TODO: please DRY me! 

		$('.js-remove-cart-item').on("click", function ()
		{
			// fix for unique ids
			var prodid = $(this).attr('id').split("_")[1];
			var productCode = $('#updateCartForm' + prodid).get(0).productCode.value;
			var initialCartQuantity = $('#updateCartForm' + prodid).get(0).initialQuantity.value;
			$('#updateCartForm' + prodid).get(0).quantity.value = 0;
			$('#updateCartForm' + prodid).get(0).initialQuantity.value = 0;
			$('#updateCartForm' + prodid).get(0).submit();
		});

		$('.js-update-product-quantity').on("click", function ()
		{
			// fix for unique ids
			var prodid = $(this).attr('id').split("_")
			prodid = prodid[1];
			var productCode = $('#updateCartForm' + prodid).get(0).productCode.value;
			var initialCartQuantity = $('#updateCartForm' + prodid).get(0).initialQuantity.value;
			var newCartQuantity = $('#updateCartForm' + prodid).get(0).quantity.value;

			$('#updateCartForm' + prodid).get(0).submit();

		});
	},

	trackRemoveFromCart: function(productCode, initialCartQuantity)
	{
		window.mediator.publish('trackRemoveFromCart',{
			productCode: productCode,
			initialCartQuantity: initialCartQuantity
		});
	},

	trackUpdateCart: function(productCode, initialCartQuantity, newCartQuantity)
	{
		window.mediator.publish('trackUpdateCart',{
			productCode: productCode,
			initialCartQuantity: initialCartQuantity,
			newCartQuantity: newCartQuantity
		});
	}
}

$(document).ready(function ()
{
	ACC.cartremoveitem.bindAll();
});
