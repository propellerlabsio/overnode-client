/* Can't use vuex mutations with these airbnb rules:                     */
/* eslint-disable no-param-reassign                                      */

const paging = {
  /**
   * Vuex mutation code that sets the offset in the paging state object based
   * on the page number.
   *
   * @param {*} pagingState   Paging object containing limit and offset props
   * @param {*} pageNumber    Page number of page being seg
   */
  setPaging(pagingState, pageNumber) {
    const offset = pagingState.limit * (pageNumber - 1);
    pagingState.offset = offset;
  },

  /**
   * Vuex getter code that returns an object containing all data relevant to a page.
   *
   * @param {*} pagingState     Paging object containing limit and offset props
   * @param {*} allData         All available data from which page data is sourced
   * @param {*} allCount        Total number of records for all pages
   * @param {*} indexProperty   Name of property in allData that is the record index if
   *                            page data is a subset of allData.
   */
  getPage(pagingState, allData, allCount, indexProperty) {
    let result = [];
    if (allData.length) {
      const fromIndex = pagingState.offset;
      const toIndex = (fromIndex + pagingState.limit) - 1;
      let pageData;
      if (indexProperty) {
        // Page data is a subset of allData
        pageData = allData
          .filter(rec => rec[indexProperty] >= fromIndex && rec[indexProperty] <= toIndex);
      } else {
        // allData is the page data, no more, no less
        pageData = allData;
      }

      result = {
        offset: pagingState.offset,
        limit: pagingState.limit,
        current: Math.floor(pagingState.offset / pagingState.limit) + 1,
        last: Math.floor(allCount / pagingState.limit) + 1,
        pageData,
      };
    }
    return result;
  },
};

export default paging;
