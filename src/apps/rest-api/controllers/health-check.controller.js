const { fullHealthCheck, routesPrefix } = require('../config');

const Controller = require('./controller');

class HealthCheckController extends Controller {

  async run(req, res, next) {

    const response = { msg: 'ok' };

    if (fullHealthCheck) {
      const apiRoutesLayers = req.app._router.stack.find(layer => layer.path === routesPrefix).handle.stack;

      response.routes = apiRoutesLayers.map(layer => {
        const { route } = layer;
        const { path, methods:methodsObj } = route;

        const methods = Object.keys(methodsObj);

        return `[${methods.join(', ').toUpperCase()}] - ${routesPrefix}${path}`;
      });

      response.serverInfo = {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        node: {
          version: process.version,
          v8: process.versions.v8,
          openssl: process.versions.openssl
        },
        platform: `${process.platform} - ${process.arch}`,
        env: process.env
      }
    }

    return res.status(200).json(response);
  }

}

module.exports = HealthCheckController;
