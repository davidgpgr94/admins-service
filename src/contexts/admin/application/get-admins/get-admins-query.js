const Criteria = require('../../../shared/domain/criteria/criteria');

class GetAdminsQuery {

  /** @type {Criteria} */
  #criteria;

  constructor({ criteria }) {
    this.#criteria = criteria;
  }

  get criteria() {
    return this.#criteria;
  }
}

module.exports = GetAdminsQuery;
