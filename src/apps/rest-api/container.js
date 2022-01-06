const awilix = require('awilix');

// Use Cases

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    // use cases
  });

  return container;
}

module.exports = {
  createContainer
}
