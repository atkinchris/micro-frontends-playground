ACCMOB.autocomplete = {

	suggestionClicked: false,

	bindOnSuggestionClick: function (suggestion, search)
	{
		$(document).on('tap', suggestion, function ()
		{
			$(search).val($(this).text());
		});
	},

	createSuggestionsContainer: function ()
	{
		$('<div id="suggestions_container"><ul id="suggestions" data-ajax="false" data-role="listview" data-inset="true" data-theme="g" data-content-theme="g"></ul></div>').insertAfter('#header');
	},

	setUp: function (searchField)
	{
		ACCMOB.autocomplete.suggestionClicked = false;
		$('div#suggestions_container ul').empty();
		$('div#suggestions_container ul').listview();

		var option = searchField.data('options');
		var value = searchField.val();

		$('div#suggestions_container ul').listview('refresh');

		searchField.autocomplete({
			target: $('#suggestions'),
			source: option.autocompleteUrl,
			link: ACCMOB.config.contextPath + '/search?text=',
			minLength: option.minCharactersBeforeRequest,
			waitTime: option.waitTimeBeforeRequest,
			displayProductImages: option.displayProductImages
		});
	},

    bindSearchAutocomplete: function ()
    {
        var $search = $("#search"),
        	option = $search.data("options"),
        	cache = {};
        
        var w=$search.width();
        $('#autocomplete-search').css('width',w+'px');
        
        $(window).resize(function(){
        	var w=$search.width();
            $('#autocomplete-search').css('width',w+'px');
        });
        

       var $searchAuto= $search.autocomplete({
            minLength: option.minCharactersBeforeRequest,
            delay: option.waitTimeBeforeRequest,
            appendTo: "#autocomplete-search",
            source: function (request, response)
            {
                var term = request.term.toLowerCase();
                if (term in cache)
                {
                    return response(cache[term]);
                }
                $.getJSON("/search/autocomplete/MobileSearchBox", {term: request.term}, function (data)
                {
                    var autoSearchData = [];
                    if(data.suggestions != null){
                        $.each(data.suggestions, function (i, obj)
                        {
                            autoSearchData.push(
                                {value: obj.term,
                                    url: ACC.config.contextPath + "/search?text=" + obj.term,
                                    type: "autoSuggestion"});
                        });
                    }
                    if(data.products != null){
                        $.each(data.products, function (i, obj)
                        {
                            autoSearchData.push(
                                {value: obj.name,
                                    code: obj.code,
                                    desc: obj.description,
                                    manufacturer: obj.manufacturer,
                                    url: ACC.config.contextPath + obj.url,
                                    price: obj.price.formattedValue,
                                    type: "productResult"/*,
                                    image: obj.images[0].url*/});
                        });
                    }
                    cache[term] = autoSearchData;
                    return response(autoSearchData);
                });
            },
            focus: function (event, ui)
            {
                return false;
            },
            select: function (event, ui)
            {
                window.location.href = ui.item.url;
            }
        }).data("uiAutocomplete")._renderItem = function (ul, item)
        {
            if (item.type == "autoSuggestion")
            {
                renderHtml = "<a href='search?text=" + item.value + "' class='clearfix'>" + item.value + "</a>";
                return $("<li class='suggestions'>")
                    .data("item.autocomplete", item)
                    .append(renderHtml)
                    .appendTo(ul);
            }
            if (item.type == "productResult")
            {
                var renderHtml = "<a href='" + ACC.config.contextPath + item.url + "' class='product clearfix'>";
                /*
                if (option.displayProductImages &&  item.image != null)
                {
                    renderHtml += "<span class='thumb'><img src='" + item.image + "' /></span><span class='desc clearfix'>";
                }
                */
                renderHtml += "<span class='title'>" + item.value +"</span>"+
                    //"</span><span class='price'>" + item.price + "</span></span>" +
                    "</a>";
                return $("<li class='product'>").data("item.autocomplete", item).append(renderHtml).appendTo(ul);
            }
        };
    },

	clearSuggestions: function ()
	{
		$("div#suggestions_container ul").empty();
	},

	initialize: function ()
	{
		var searchField = $("#search");
		if (searchField.length==0)
			return;

		ACCMOB.autocomplete.createSuggestionsContainer();

		searchField.on("focusout", function (e)
		{
			if (!ACCMOB.autocomplete.suggestionClicked)
			{
				ACCMOB.autocomplete.clearSuggestions();
			}
		});

		searchField.on("focusin", function ()
		{
//			ACCMOB.autocomplete.setUp($("#search"));
            ACCMOB.autocomplete.bindSearchAutocomplete();
		});


		$("div#suggestions_container ul > li a").on("mousedown", function ()
		{
			ACCMOB.autocomplete.suggestionClicked = true;
		});

		ACCMOB.autocomplete.bindOnSuggestionClick('#suggestions > li', '#search');
	}
};

$(document).ready(function ()
{
	ACCMOB.autocomplete.initialize();
});
