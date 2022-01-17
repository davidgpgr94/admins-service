const Conflict = require('./conflict');
const { EMAIL_ALREADY_USED } = require('../api-error-codes');

class EmailAlreadyUsedError extends Conflict {
  constructor(emailUsed) {
    super(EMAIL_ALREADY_USED, `The email '${emailUsed}' is already used`, { emailUsed: emailUsed.value });
  }
}

module.exports = EmailAlreadyUsedError;
