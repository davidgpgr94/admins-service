const NotEmptyStringValueObject = require('../../shared/domain/value-objects/not-empty-string-value-object');

class AdminName extends NotEmptyStringValueObject {
  constructor(name) {
    super(name);
  }
}

module.exports = AdminName;
