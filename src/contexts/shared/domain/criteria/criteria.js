const Filter = require('./filter/filter');
const Page = require('./page/page');

class Criteria {

  /** @type {Page} */
  #page;

  /** @type {Filter[]} */
  #filters;

  constructor({ page, filters }) {
    this.#page = page;
    this.#filters = filters || [];
  }

  get page() {
    return this.#page;
  }

  get filters() {
    return this.#filters;
  }

  /**
   * @param {Filter} filter
   *
   * @returns {this}
   */
  addFilter(filter) {
    this.#filters.push(filter);

    return this;
  }
}

module.exports = Criteria;
