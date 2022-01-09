const NotEmptyStringValueObject = require('../../../shared/domain/value-objects/not-empty-string-value-object');

class RequestRestorePasswordResponse {

  /** @type {NotEmptyStringValueObject} */
  #token;

  constructor({ token }) {
    this.#token = token;
  }

  get token() {
    return this.#token;
  }
}

module.exports = RequestRestorePasswordResponse;
