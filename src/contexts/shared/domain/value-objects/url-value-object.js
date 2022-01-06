const URL = require('url').URL;

const InvalidArgumentError = require('../errors/invalid-argument-error');
const NotEmptyStringValueObject = require('./not-empty-string-value-object');

class UrlValueObject extends NotEmptyStringValueObject {
  constructor(value) {
    super(value);
    this.#ensureIsValidUrl();
  }

  #ensureIsValidUrl() {
    if (!this.#isValidUri()) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow invalid URIs`, { invalidUri: this.value });
    }
  }

  #isValidUri() {
    try {
      new URL(this.value);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UrlValueObject;
