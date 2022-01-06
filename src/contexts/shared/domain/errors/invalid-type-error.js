const DomainError = require('./domain-error');

class InvalidTypeError extends DomainError {
  constructor(typeGiven, expedtedType) {
    super(`Invalid type. Expected "${expedtedType}", but given "${typeGiven}"`);

    this.data = { typeGiven, expedtedType };
  }
}

module.exports = InvalidTypeError;
