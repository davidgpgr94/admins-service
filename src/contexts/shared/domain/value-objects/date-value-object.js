const InvalidTypeError = require('../errors/invalid-type-error');
const ValueObject = require('./value-object');

class DateValueObject extends ValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsDate();
  }

  #ensureIsDate() {
    if (!(this.value instanceof Date)) {
      throw new InvalidTypeError(typeof this.value, Date.name);
    }
  }

  toString() {
    return this.value.toISOString();
  }
}

module.exports = DateValueObject;
