const InvalidTypeError = require('../errors/invalid-type-error');
const ValueObject = require('./value-object');

class IntValueObject extends ValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsInteger();
  }

  #ensureIsInteger() {
    if (!Number.isInteger(this.value)) {
      throw new InvalidTypeError(typeof this.value, 'integer');
    }
  }
}

module.exports = IntValueObject;
