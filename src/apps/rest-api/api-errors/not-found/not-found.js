const ApiError = require('../api-error');
const { DEFAULT_NOT_FOUND } = require('../api-error-codes');

class NotFound extends ApiError {
  constructor(code = DEFAULT_NOT_FOUND, message = 'Not found', data = {}) {
    super(404, code, message, data);
  }
}

module.exports = NotFound;
