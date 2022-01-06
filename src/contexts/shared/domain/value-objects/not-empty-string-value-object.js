const InvalidArgumentError = require('../errors/invalid-argument-error');
const StringValueObject = require('./string-value-object');

class NotEmptyStringValueObject extends StringValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsNotEmpty();
  }

  #ensureIsNotEmpty() {
    if (this.value.trim().length === 0) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow empty string`, { value: this.value });
    }
  }
}

module.exports = NotEmptyStringValueObject;
