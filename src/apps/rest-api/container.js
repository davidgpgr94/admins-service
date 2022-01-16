const awilix = require('awilix');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Api Controllers
const HealthCheckController = require('./controllers/health-check.controller');

// Use Cases

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    logger: awilix.asClass(WinstonLogger).singleton(),

    // controllers
    HealthCheckController: awilix.asClass(HealthCheckController),

    // use cases
  });

  return container;
}

module.exports = {
  createContainer
}
