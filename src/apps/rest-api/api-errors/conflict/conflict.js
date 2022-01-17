const ApiError = require('../api-error');
const { DEFAULT_CONFLICT } = require('../api-error-codes');

class Conflict extends ApiError {
  constructor(code = DEFAULT_CONFLICT, message = 'Conflict', data = {}) {
    super(409, code, message, data);
  }
}

module.exports = Conflict;
