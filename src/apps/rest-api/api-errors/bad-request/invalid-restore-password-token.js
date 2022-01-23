const { INVALID_RESTORE_PASSWORD_TOKEN } = require('../api-error-codes');
const BadRequest = require('./bad-request');

class InvalidRestorePasswordToken extends BadRequest {
  constructor() {
    super(INVALID_RESTORE_PASSWORD_TOKEN, 'Invalid token');
  }
}

module.exports = InvalidRestorePasswordToken;
