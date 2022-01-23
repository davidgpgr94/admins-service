const BadRequest = require('./bad-request');
const { INCORRECT_PASSWORD } = require('../api-error-codes');

class IncorrectPassword extends BadRequest {
  constructor() {
    super(INCORRECT_PASSWORD, 'Incorrect password');
  }
}

module.exports = IncorrectPassword;
