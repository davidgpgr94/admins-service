const awilix = require('awilix');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Use Cases

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    logger: awilix.asClass(WinstonLogger).singleton(),

    // use cases
  });

  container.loadModules(
    [
      './controllers/**/*.controller.js'
    ],
    {
      cwd: __dirname,
      formatName: 'camelCase',
      resolverOptions: {
        register: awilix.asClass
      }
    }
  );

  return container;
}

module.exports = {
  createContainer
}
