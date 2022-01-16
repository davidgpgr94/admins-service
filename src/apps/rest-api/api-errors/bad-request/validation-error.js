const BadRequest = require('./bad-request');
const { VALIDATION_ERROR } = require('../api-error-codes');

class ValidationError extends BadRequest {
  constructor(param, validationErrorMessage) {
    super(VALIDATION_ERROR, validationErrorMessage, { param, validationErrorMessage });
  }
}

module.exports = ValidationError;
