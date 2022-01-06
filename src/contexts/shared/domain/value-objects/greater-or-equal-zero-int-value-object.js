const InvalidArgumentError = require('../errors/invalid-argument-error');
const IntValueObject = require('./int-value-object');

class GreaterOrEqualZeroIntValueObject extends IntValueObject {
  constructor(value) {
    super(value);

    this.#ensureIsGratherOrEqualZero();
  }

  #ensureIsGratherOrEqualZero() {
    if (this.value < 0)
      throw new InvalidArgumentError(`<${this.constructor.name}> only allows integers greater than or equal to 0`);
  }
}

module.exports = GreaterOrEqualZeroIntValueObject;
