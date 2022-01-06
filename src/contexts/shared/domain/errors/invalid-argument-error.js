const DomainError = require('./domain-error');

class InvalidArgumentError extends DomainError {
  constructor(msg = 'Invalid argument', data = {}) {
    super(msg);

    this.data = data;
  }
}

module.exports = InvalidArgumentError;
