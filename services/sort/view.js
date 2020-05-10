import styles from './css/styles.css';

export default ({ staticPath}) => {
  return `
<div class="ln-u-display-none ln-u-display-inline-block@sm ln-u-1/3@sm ln-o-grid__item">
  <form autocomplete="false" id="sort_form1" name="sort_form1" method="get" action="#" class="ln-u-display-flex ln-u-soft-bottom">
    <label for="sortOptions1" class="ln-c-label--alt ln-u-font-weight-medium"></label>
    <select data-theme="none" id="sortOptions1" name="sort" class="ln-c-select ln-c-select--alt" title="Sort by">
      <option value="relevance" selected="selected">
              Relevance</option>
      <option value="price-asc">
              Price (lowest first)</option>
      <option value="price-desc">
              Price (highest first)</option>
      <option value="newArrivals">
              search.page.sort.newArrivals</option>
      <option value="bvratings">
              Ratings</option>
      <option value="reducedItems">
              Reduced items</option>
      <option value="new-desc">
              search.page.sort.new-desc</option>
      <option value="new-asc">
              search.page.sort.new-asc</option>
      </select>
  </form>
</div>
`;
}

/*
<div class="ln-u-1/1 ln-u-1/2@xs ln-u-1/3@sm ln-o-grid__item">
    <c:if test='${not feature:isEnabled("feature.productimagery.plp.amplience")}'>
        <form class="ln-u-text-align-center ln-u-soft-bottom">
            <label class="ln-c-form-slider ln-c-form-slider--alt" for="modelFlat">
                <input type="checkbox" id="modelFlat" name="modelFlat" class="ln-u-hidden js-toggleSwitch"/>
                <span class="ln-c-form-slider__mechanism">
                    <span class="ln-c-form-slider__state"></span>
                </span>
            </label>
        </form>
    </c:if>
</div>
 */