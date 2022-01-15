require('dotenv').config();

const { port, routesPrefix } = require('./config');
const ApiServer = require('./api-server');
const { createContainer } = require('./container');

(async () => {
  const container = await createContainer();

  const logger = container.resolve('logger');

  const apiServer = new ApiServer(port, container, routesPrefix);

  apiServer.listen().then(() => {
    const httpServer = apiServer.getHttpServer();

    httpServer.on('close', () => container.dispose());
  });

  process.on('uncaughtException', error => {
    logger.error(`${error.name}: ${error.message}`, {stack: error.stack});
  });

  process.on('SIGTERM', () => {
    logger.info('Stopping api server');
    apiServer.stop()
      .catch(error => logger.error('Could not stop the server', {message: error.message, stack: error.stack}));
  });

})();
