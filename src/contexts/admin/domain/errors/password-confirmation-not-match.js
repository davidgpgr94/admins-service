const DomainError = require('../../../shared/domain/errors/domain-error');

class PasswordConfirmationNotMatch extends DomainError {
  constructor() {
    super('Password confirmation does not match');
  }
}

module.exports = PasswordConfirmationNotMatch;
