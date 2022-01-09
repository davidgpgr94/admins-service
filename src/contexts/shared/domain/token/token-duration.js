const PositiveIntValueObject = require('../value-objects/positive-int-value-object');

class TokenDuration extends PositiveIntValueObject {
  static #DEFAULT_TOKEN_DURATION = 2 * 60 * 60; // In seconds

  static default() {
    return new TokenDuration(TokenDuration.#DEFAULT_TOKEN_DURATION);
  }
}

module.exports = TokenDuration;
