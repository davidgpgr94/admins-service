const InvalidArgumentError = require('../errors/invalid-argument-error');
const IntValueObject = require('./int-value-object');

class PositiveIntValueObject extends IntValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsPositive();
  }

  #ensureIsPositive() {
    if (this.value <= 0) {
      throw new InvalidArgumentError(`<${this.constructor.name}> only allows integers greater than 0`);
    }
  }
}

module.exports = PositiveIntValueObject;
