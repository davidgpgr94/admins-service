const DomainError = require('../../../shared/domain/errors/domain-error');
const AdminPassword = require('../admin-password');

class PasswordTooShort extends DomainError {
  constructor(passwordLength) {
    super(`The password must have at least ${AdminPassword.MIN_LENGTH} characters`);

    this.data = { passwordLength }
  }
}

module.exports = PasswordTooShort;
