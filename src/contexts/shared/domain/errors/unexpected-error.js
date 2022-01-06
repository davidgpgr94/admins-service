const DomainError = require('./domain-error');

class UnexpectedError extends DomainError {
  constructor() {
    super('Unexpected error');
  }
}

module.exports = UnexpectedError;
