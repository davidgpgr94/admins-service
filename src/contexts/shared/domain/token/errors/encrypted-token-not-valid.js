const DomainError = require('../../errors/domain-error');
const NotEmptyStringValueObject = require('../../value-objects/not-empty-string-value-object');

class EncryptedTokenNotValid extends DomainError {

  /** @param {NotEmptyStringValueObject} encryptedToken */
  constructor(encryptedToken) {
    super('Token not valid');

    this.data = { encryptedToken };
  }
}

module.exports = EncryptedTokenNotValid;
