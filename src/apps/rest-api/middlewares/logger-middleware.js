const morgan = require('morgan');

const { logs:{requestsLogsFormat} } = require('../config');

module.exports = (logger) => {
  const stream = {
    write: (message) => logger.info(message)
  };

  const loggerMiddleware = morgan(
    requestsLogsFormat,
    { stream, skip: false }
  );

  return loggerMiddleware;
}
