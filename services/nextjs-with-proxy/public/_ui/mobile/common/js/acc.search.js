ACC.search = {

    bindAll: function () {
        this.bindShowMore('.showmore #showMore');

    },

    bindShowMore: function (showMoreBtn) {

        $(document).on('tap click', showMoreBtn, function (e) {
            e.preventDefault();
            var queryUrl = $(this).attr('href');
            $.ajax({
                url: queryUrl,
                cache: false,
                type: 'GET',
                success: function (data) {
                    var productResultsGrid = '.productResultsGrid';
                    var showmore = '.showmore';
                    $(productResultsGrid).append($(data).filter(productResultsGrid).html());
                    $(showmore).html($(data).filter(showmore).html());
                }
            });
            return false;
        });
    }
};

$(document).ready(function () {
    ACC.search.bindAll();
});
