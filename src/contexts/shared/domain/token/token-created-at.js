const InvalidArgumentError = require('../errors/invalid-argument-error');
const DateValueObject = require('../value-objects/date-value-object');

class TokenCreatedAt extends DateValueObject {
  constructor(value) {
    super(value);

    this.#ensureIsNotFutureDate();
  }

  static now() {
    return new TokenCreatedAt(new Date());
  }

  #ensureIsNotFutureDate() {
    const currentDate = new Date();

    if (this.value > currentDate) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow future dates`);
    }
  }
}

module.exports = TokenCreatedAt;
