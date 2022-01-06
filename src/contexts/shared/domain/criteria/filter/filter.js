const ValueObject = require('../../value-objects/value-object');

class Filter {

  /** @type {string} */
  #field;
  /** @type {ValueObject} */
  #value;

  constructor(field, value) {
    this.#field = field;
    this.#value = value;
  }

  get field() {
    return this.#field;
  }

  get value() {
    return this.#value;
  }
}

module.exports = Filter;
