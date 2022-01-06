const NotEmptyStringValueObject = require('../../shared/domain/value-objects/not-empty-string-value-object');

class AdminSurname extends NotEmptyStringValueObject {
  constructor(surname) {
    super(surname);
  }
}

module.exports = AdminSurname;
