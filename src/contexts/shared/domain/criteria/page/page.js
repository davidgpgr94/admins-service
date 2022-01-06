const PageLimit = require('./page-limit');
const PageOffset = require('./page-offset');

class Page {
  #offset;
  #limit;

  /**
   * @param {Object} o
   * @param {PageOffset|null} o.offset
   * @param {PageLimit|null} o.limit
   */
  constructor({ offset, limit }) {
    this.#offset = offset || PageOffset.createFirst();
    this.#limit = limit || PageLimit.createDefault();
  }

  get offset() {
    return this.#offset;
  }

  get limit() {
    return this.#limit;
  }

  next() {
    const nextPageNumber = this.currentPageNumber() + 1;

    return Page.createPageNumber(nextPageNumber);
  }

  previous() {
    const previousePageNumber = this.currentPageNumber() - 1;

    return Page.createPageNumber(previousePageNumber);
  }

  currentPageNumber() {
    const { value:offset } = this.offset;

    return (offset / PageLimit.ITEMS_PER_PAGE) + 1;
  }

  static createFirstPage() {
    return new Page({
      offset: PageOffset.createFirst(),
      limit: PageLimit.createDefault()
    });
  }

  static createPageNumber(pageNumber) {
    if (pageNumber <= 0) return Page.createFirstPage();

    const offsetInt = (pageNumber - 1) * PageLimit.ITEMS_PER_PAGE;

    return new Page({
      offset: new PageOffset(offsetInt),
      limit: PageLimit.createDefault()
    });
  }
}

module.exports = Page;
