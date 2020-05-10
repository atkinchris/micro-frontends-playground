ACCMOB.common = {
	currentPath: window.location.pathname,
	visiblePopupId: '',
	timeouts: [],
	dialogTopOffset: 45,

	clearAllTimeouts: function ()
	{
		for (key in ACCMOB.common.timeouts)
		{
			clearTimeout(ACCMOB.common.timeouts[key]);
		}
		ACCMOB.common.timeouts = [];
	},

	lockScreen: function ()
	{
		$("body").css({overflow: 'hidden'});
		$("body").height(window.outerHeight);
	},

	unlockScreen: function ()
	{
		$("body").css({
			overflow: 'visible'
		});
		ACCMOB.common.clearAllTimeouts();
	},

	bindFormLinks: function ()
	{
		$('.formLink').on("click", function ()
		{
			$(this).parent("form").submit();
			return false;
		});
	},

	/*
	 * Show all items or View Less items for <ul>. numberOfItems(numbering starts from 0) is a mandatory
	 * attribute in ul tag.
	 */
	bindShowAllItems: function ()
	{
		$('.showAllItems').on("click", function ()
		{
			$('#cartTotals').show();

			var numberOfItems = $('.itemsList').attr('numberOfItems');
			var liFilterClass = $('.itemsList').attr('liFilterClass');
			$('.viewLess').removeAttr('style');
			$(this).hide();
			$('.itemsList').find('li').show().end().append($('.viewLess')
					.on("click", function ()
					{
						$('.itemsList li').filter('.' + liFilterClass)
								.filter('li:gt(' + numberOfItems + ')').hide();
						$(this).attr('style', 'display:none');
						$('.showAllItems').show();
						$('#cartTotals').hide();
					}));

		});
	},

	/* Show spinner on all form posts */
	allFormPosts: function ()
	{
		// select all links that are not #, '' or javascript:void();
		$('form[method="post"]').on("submit", function ()
		{
            ACCMOB.common.showPageLoadingMsg;
		});
	},

	bindShowProcessingMessageToSubmitButton : function () {

		$(':submit.show_processing_message').each(function(){
			$(this).on("click",ACCMOB.common.showPageLoadingMsg)
		});
	},

	preventDefault: function (event)
	{
		if (!(typeof event === "undefined") && !!event)
		{
			event.preventDefault();
		}
	},

	bindSkipToContentLink: function ()
	{
		$("a.skiptocontent").on("click", function (e)
		{
			$($(this).attr("href")).find("a").first().focus();
			return true;
		});
	},

	initialize: function ()
	{
		with (ACCMOB.common)
		{
			bindFormLinks();
			bindShowAllItems();
			allFormPosts();
			bindSkipToContentLink();
			bindShowProcessingMessageToSubmitButton();
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.common.initialize();
});

// add a CSRF request token to POST ajax request if its not available
$.ajaxPrefilter(function (options, originalOptions, jqXHR)
{
	// Modify options, control originalOptions, store jqXHR, etc
	if (options.type === "post" || options.type === 'POST')
	{
		if (options.data.indexOf("CSRFToken") === -1)
		{
			options.data = options.data + "&CSRFToken=" + ACCMOB.config.CSRFToken;
		}
	}
});
