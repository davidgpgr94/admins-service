const ApiError = require('../api-error');
const { DEFAULT_BAD_REQUEST } = require('../api-error-codes');

class BadRequest extends ApiError {
  constructor(code = DEFAULT_BAD_REQUEST, message = 'Bad request', data = {}) {
    super(400, code, message, data);
  }
}

module.exports = BadRequest;
