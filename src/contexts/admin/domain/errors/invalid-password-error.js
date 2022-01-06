const DomainError = require('../../../shared/domain/errors/domain-error');

class InvalidPasswordError extends DomainError {
  constructor() {
    super('Invalid password');
  }
}

module.exports = InvalidPasswordError;
