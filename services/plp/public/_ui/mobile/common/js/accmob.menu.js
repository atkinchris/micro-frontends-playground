ACCMOB.menu = {
	bindMenuButton: function (menuButton)
	{
		if (menuButton.length > 0)
		{
			menuButton.on("click", function ()
			{
				$.mobile.easydialog({header:$(this).attr('title'),content: $("#popupMenu").html()});
			});
		}
	},

	/* Header buttons and popups */
	togglePopup: function (popupId)
	{
		if (ACCMOB.menu.visiblePopupId != '')
		{
			$(ACCMOB.menu.visiblePopupId).css("display", "none");
			$("#" + ACCMOB.menu.clickPreventLayerSelector).remove();

			if (popupId != ACCMOB.menu.visiblePopupId)
			{
				ACCMOB.menu.showPopup(popupId);
			}
			else
			{
				ACCMOB.menu.visiblePopupId = '';
			}
		}
		else
		{
			ACCMOB.menu.showPopup(popupId);
		}
	},

	showPopup: function (popupId)
	{
		$("body").append($("<div id='" + ACCMOB.menu.clickPreventLayerSelector + "'>"));
		$(popupId).show();
		ACCMOB.menu.visiblePopupId = popupId;
	},

	headerButtonClicked: function (buttonId, popupId)
	{
		var button = $(buttonId);
		var buttonPosition = button.position();
		var buttonLeft = buttonPosition.left;
		var windowWidth = $(window).width();
		var popupLeft = buttonLeft;
		var popup = $(popupId);

		if ((buttonLeft + popup.width()) > windowWidth)
		{
			popupLeft = windowWidth - popup.width();
		}

		popup.css("left", popupLeft);
		popup.css("top", $("#top-nav-bar").outerHeight());

		ACCMOB.menu.togglePopup(popupId);
	},

    headerButtonSlide: function(buttonId, sliderId){
        /*TODO change into Slide Push menu*/
        var slider = $(sliderId);
        slider.toggle("slide", {
            direction:"left",
            distance:180
        }, 500);
    },

	footerButtonClicked: function (buttonId, popupId)
	{
		var button = $(buttonId);
		var buttonOffset = button.offset();
		var buttonLeft = buttonOffset.left;
		var buttonRight = buttonLeft + button.outerWidth();
		var buttonTop = buttonOffset.top;
		var windowWidth = $(window).outerWidth();
		var popup = $(popupId);
		var popupTop = (buttonTop - popup.outerHeight()) - 1;
		var marginWidth = $("#body").width() - $("[data-role='content']").width();
		var popupLeft = (buttonRight - popup.outerWidth()) - marginWidth;

		if (buttonRight > windowWidth)
		{
			var popupLeft = buttonRight - $(popupId).width();
		}

		$(popupId).css("left", popupLeft);
		$(popupId).css("top", popupTop);

		ACCMOB.menu.togglePopup(popupId);
	},

	bindNavigationButtons: function ()
	{
		if ($("#top-nav-bar-settings").length > 0)
		{
			$("#top-nav-bar-settings").on("click", function (event)
			{
				ACCMOB.menu.headerButtonClicked("#top-nav-bar-settings", "#currencyLanguageSelector");
				return false;
			});
		}

		if ($("#top-nav-bar-account").length > 0)
		{
			$("#top-nav-bar-account").on("click", function (event)
			{
				ACCMOB.menu.headerButtonClicked("#top-nav-bar-account", "#userSettings");
				return false;
			});
		}

		if ($("#top-nav-bar-menu").length > 0)
		{
			$("#top-nav-bar-menu").on("click", function (event)
			{
//				ACCMOB.menu.headerButtonClicked("#top-nav-bar-menu", "#menuContainer");
                ACCMOB.menu.headerButtonSlide("#top-nav-bar-menu", "#menuContainer");
				return false;
			});
		}
	},

	bindClickPreventLayer: function (clickPreventLayerSelector)
	{
		ACCMOB.menu.clickPreventLayerSelector = clickPreventLayerSelector;

		$("#" + clickPreventLayerSelector).on("vclick", function ()
		{
			ACCMOB.menu.togglePopup();
			$("#" + clickPreventLayerSelector).remove();
		});
	}

	/* End header buttons and popups */

};

$(document).ready(function ()
{
	with (ACCMOB.menu)
	{
		//bindMenuButton($("#menuButton"));
		//bindNavigationButtons();
		//bindConnectButton($("#connect-button"));
		//bindClickPreventLayer("clickPreventLayer");
	}
});
