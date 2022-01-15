const { debugErrors } = require('../config');

const ApiError = require('../api-errors/api-error')
const InternalServerError = require('../api-errors/internal-server-error/internal-server-error')

module.exports = (logger) => {
  return (err, req, res, next) => {
    const error = (err instanceof ApiError)
      ? err
      : new InternalServerError();

    if (debugErrors || error instanceof InternalServerError) {
      logger.error(req.originalUrl, { body: req.body, errorStack: error.stack });
    }

    return res.status(error.statusCode).json(error.toJson());
  }
}
