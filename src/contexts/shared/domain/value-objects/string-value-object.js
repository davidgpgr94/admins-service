const InvalidTypeError = require('../errors/invalid-type-error');
const ValueObject = require('./value-object');

class StringValueObject extends ValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsStringValue();
  }

  #ensureIsStringValue() {
    if (typeof this.value !== 'string') {
      throw new InvalidTypeError(typeof this.value, 'string');
    }
  }

  toString() {
    return this.value;
  }
}

module.exports = StringValueObject;
