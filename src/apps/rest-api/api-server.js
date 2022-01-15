const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const RouteNotFound = require('./api-errors/not-found/route-not-found');

const errorHandler = require('./middlewares/error-handler');
const loggerMiddleware = require('./middlewares/logger-middleware');

const { registerAllRoutes } = require('./routes');

class ApiServer {

  #port;
  #routesPrefix;
  #logger;
  #app;
  /** @type {http.Server} */
  #httpServer;

  constructor(port, container, routesPrefix) {
    this.#port = port;
    this.#routesPrefix = routesPrefix;
    this.#httpServer = null;
    this.#logger = container.resolve('logger');
    this.#app = express();

    this.#setupMiddlewares();
    this.#setupRoutes(container);

    this.#app.use(errorHandler(this.#logger));
  }

  listen() {
    return new Promise(resolve => {
      if (!this.#httpServer) {
        this.#httpServer = this.#app.listen(this.#port, () => {
          this.#logger.info(`AdminsService api listening on port ${this.#port}`);
          this.#logger.info('  Press CTRL+C to stop\n');

          resolve();
        });
      }
    })
  }

  getHttpServer() {
    return this.#httpServer;
  }

  getApp() {
    return this.#app;
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (!this.#httpServer) return resolve();

      this.#httpServer.close(error => {
        if (error) return reject(error);

        this.#httpServer = null;

        return resolve();
      });
    });
  }

  #setupRoutes(container) {
    const router = registerAllRoutes(express.Router(), container);

    this.#app.use(this.#routesPrefix, router);

    this.#app.use('/*', (req, res, next) => {
      next(new RouteNotFound(req.originalUrl));
    });
  }

  #setupMiddlewares() {
    this.#app.use(express.urlencoded({ extended: false }));
    this.#app.use(express.json());
    this.#app.use(cors());
    this.#app.use(helmet());
    this.#app.use(loggerMiddleware(this.#logger));
  }
}

module.exports = ApiServer;
