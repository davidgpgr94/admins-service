const DomainError = require('../../../shared/domain/errors/domain-error');

class EmailAlreadyUsed extends DomainError {
  constructor(emailInUse) {
    super(`The email ${emailInUse} is already in use`);

    this.data = { emailInUse };
  }
}

module.exports = EmailAlreadyUsed;
