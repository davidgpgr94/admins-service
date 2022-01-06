require('dotenv').config();

const { createContainer } = require('./container');

(async () => {
  const container = await createContainer();

  const { startServer } = apiServer(container);

  const api = startServer();

  const logger = container.resolve('logger');

  logger.info('App running...', {patata: '33'});
})();
