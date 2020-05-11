ACC.refinements = {

	bindAll: function ()
	{
		this.bindRefinementCategoryToggles();
        this.bindAddFilterButton('#addFilters');
        this.bindDoneFilterButton('#facetsNavFiltersContainer .doneBtn');
        this.bindApplyFilterButton('#facetsNavFiltersContainer .applyBtn');
        this.bindCancelFilterButton('#facetsNavFiltersContainer .cancelBtn');
        this.bindClearAllFilterButton('#facetsNavFiltersContainer .clearAllBtn');
        this.bindPopulateAppliedFilter();
        this.bindRemoveSelectFilterButton('#facetsNavFiltersContainer .removeFacet');
	},

	bindRefinementCategoryToggles: function ()
	{
		$('a.refinementToggle').each(function ()
		{
			$(this).attr('title', $(this).data('hideFacetText'));

			$(this).on("click", function ()
			{
				var content = $(this).closest('.item').find('div.facetValues');
				$(this).attr('title', $(content).is(':visible') ? $(this).data('showFacetText') : $(this).data('hideFacetText'));
                $(content).slideToggle();
				return false;
			});

			$(this).next().click(function (ev)
			{
				ev.preventDefault();
				$(this).prev().click();
			});
		});
    },

    bindAddFilterButton: function (addFilterButton) {
        $(addFilterButton).on('tap click', function() {
            $('#facetsNavFiltersContainer').slideToggle();
            
            return false;
        })
        
    },
    
    bindDoneFilterButton: function (doneFilterButton) {
        $(document.body).on('click', doneFilterButton, function() {
            event.preventDefault();
            var facetsNavFiltersContainer = $('#facetsNavFiltersContainer');
            var sortValue = $('#sort_form1').find('select option[selected=selected]').val();
            var originalTextSearchValue = facetsNavFiltersContainer.find('.filterForm input[type=hidden][name=q]').val();
            var categoryCodeValue = facetsNavFiltersContainer.find('.filterForm input[type=hidden][name=category]').val();
            var pageType = facetsNavFiltersContainer.find('.filterForm input[type=hidden][name=pagetype]').val();

            var queryUrl = "";
            if (categoryCodeValue === undefined) {
                queryUrl = 'search?q=' + originalTextSearchValue + ':' + sortValue;
            } else {
                queryUrl = '?categorycode=' + encodeURIComponent(categoryCodeValue) + '&pagetype='+ pageType + '&q=' + escape(originalTextSearchValue + ':' + sortValue) ;
            }
            
            var currentSelectMoreFacetCounter = 0;
            var currentSelectFacetCounter = 0;
            var queryUrlParameter = "";
            facetsNavFiltersContainer.find('.filterForm input:checked').each(function(){
                if (queryUrlParameter.indexOf($(this).val()) === -1) {
                    queryUrlParameter += ':' + $(this).val();
                    currentSelectMoreFacetCounter++;
                }
                currentSelectFacetCounter++
            });
            queryUrlParameter = escape(queryUrlParameter);
            var selectedFacetCounter = facetsNavFiltersContainer.find('.filterForm input[type=hidden][name=q]').data('facetcounter');
            if (currentSelectMoreFacetCounter > 0) {
                window.location.href = queryUrl + queryUrlParameter;
            } else {
                if (currentSelectFacetCounter < selectedFacetCounter) {
                    window.location.href = queryUrl + queryUrlParameter;
                } else {
                    facetsNavFiltersContainer.slideToggle();
                }
            }
        });
    },

    bindApplyFilterButton: function (doneFilterButton) {
        $(document.body).on('click', doneFilterButton, function () {
            event.preventDefault();
            var facetValueContainer = $(this).closest('.facetValues');
            var selectFacetHtml = '';
            facetValueContainer.find('input:checked').each(function () {
                selectFacetHtml += "<div class='selectFacetValueLine'>" + $(this).data('name') + " <span class='removeFacet'></span></div>";
            });
            var selectFacetContainer = facetValueContainer.parent().find('.selectFacet');
            if (selectFacetHtml.length > 0) {
                selectFacetContainer.show();
                selectFacetContainer.html(selectFacetHtml);
            } else {
                selectFacetContainer.hide();
                selectFacetContainer.html('');
            }
            facetValueContainer.slideToggle();
            ACC.refinements.bindPopulateAppliedFilter();
        });
    },

    bindCancelFilterButton: function (cancelFilterButton) {
        $(cancelFilterButton).on('click', function () {
            var facetValueContainer = $(this).parent().parent();

            facetValueContainer.find('input:checked').each(function () {
                $(this).prop('checked', false);
            });
            
            var selectFacetContainer = facetValueContainer.parent().find('.selectFacet');
            selectFacetContainer.html('');
            selectFacetContainer.hide();
            
            facetValueContainer.slideToggle();
            return false;
        });
    },

    bindPopulateAppliedFilter: function () {
        
        var facetsNavFiltersContainer = $('#facetsNavFiltersContainer');
        var selectFacet = $('.selectFacet');

        selectFacet.each(function () {
            $(this).html('');
        });
        
        facetsNavFiltersContainer.find('.filterForm input:checked').each(function () {
            var facetCategory = $(this).data('category');
            var facetSelectedValueContainer = $('.selectFacet[data-facet="' + facetCategory + '"]');
            facetSelectedValueContainer.html(facetSelectedValueContainer.html().trim() + '<div class=\'selectFacetValueLine\'>' + $(this).data('name') + '<span class=\'removeFacet\'></span></div>');
        });

        selectFacet.each(function () {
            if ($(this).html().length > 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        
        if (facetsNavFiltersContainer.find('.filterForm input:checked').length === 0) {
            $('#facetsNavFiltersContainer .clearAllBtn').addClass('disabled');
        } else {
            $('#facetsNavFiltersContainer .clearAllBtn').removeClass('disabled');
        }
        
        ACC.refinements.bindRemoveSelectFilterButton('#facetsNavFiltersContainer .removeFacet');
    },
    
    bindRemoveSelectFilterButton: function(removeBtn) {
        $(removeBtn).on('tap click', function() {
            var facetValuesContainer = $(this).parent().parent().parent().find('.facetValues');
            var facetValue = $(this).parent().text();

            var facetCheckbox = facetValuesContainer.find('input:checked[data-name="' + facetValue.trim() + '"]');
            facetCheckbox.prop('checked', false);
            facetCheckbox.removeAttr('checked');
            ACC.refinements.bindPopulateAppliedFilter();
            return false;
        }); 
    },

    bindClearAllFilterButton: function (clearAllBtn) {
        $(clearAllBtn).on('tap click', function () {
            if ($(clearAllBtn).hasClass('disabled')) {
                event.preventDefault();
                return false;
            }
        });
    }


};

$(document).ready(function ()
{
	ACC.refinements.bindAll();
});
