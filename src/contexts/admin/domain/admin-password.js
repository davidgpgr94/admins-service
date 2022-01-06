const NotEmptyStringValueObject = require('../../shared/domain/value-objects/not-empty-string-value-object');

class AdminPassword extends NotEmptyStringValueObject {
  static MIN_LENGTH = 6;

  constructor(password) {
    super(password);
  }
}

module.exports = AdminPassword;
