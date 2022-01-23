const path = require('path');
const glob = require('glob');

const registerAllRoutes = (router, container) => {
  const routes = glob.sync(path.join(__dirname, '/**/*.route.js'));

  routes.forEach(route => {
    require(route)({ router, ...container.cradle });
  });

  return router;
}

module.exports = { registerAllRoutes };
