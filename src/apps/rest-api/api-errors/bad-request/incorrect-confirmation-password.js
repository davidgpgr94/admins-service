const BadRequest = require('./bad-request');
const { INCORRECT_CONFIRMATION_PASSWORD } = require('../api-error-codes');

class IncorrectConfirmationPassword extends BadRequest {
  constructor() {
    super(INCORRECT_CONFIRMATION_PASSWORD, 'Incorrect confirmation password');
  }
}

module.exports = IncorrectConfirmationPassword;
