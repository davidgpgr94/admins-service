const InternalServerError = require('../api-errors/internal-server-error/internal-server-error');

class Controller {

  #errorHandlers;

  constructor(errorHandlers = {}) {
    this.#errorHandlers = errorHandlers;
  }

  async run(req, res, next) {
    throw new Error('not implemented yet');
  }

  errorHandler(error) {
    const handler = this.#errorHandlers[error.constructor.name];

    return handler ? handler(error) : new InternalServerError();
  }
}

module.exports = Controller;
