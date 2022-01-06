const NotEmptyStringValueObject = require('../../shared/domain/value-objects/not-empty-string-value-object');
const InvalidArgumentError = require('../../shared/domain/errors/invalid-argument-error');

class AdminEmail extends NotEmptyStringValueObject {
  constructor(email) {
    super(email);
    this.#ensureIsValidEmail();
  }

  #ensureIsValidEmail() {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailString = String(this.value).toLowerCase();

    if (!emailString.match(EMAIL_REGEX)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not have a valid email format`, { email: this.value });
    }
  }
}

module.exports = AdminEmail;
