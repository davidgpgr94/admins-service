const ApiError = require('../api-error');
const { DEFAULT_INTERNAL_SERVER_ERROR } = require('../api-error-codes');

class InternalServerError extends ApiError {
  constructor(code = DEFAULT_INTERNAL_SERVER_ERROR, message = 'Internal server error', data = {}) {
    super(500, code, message, data);
  }
}

module.exports = InternalServerError;
