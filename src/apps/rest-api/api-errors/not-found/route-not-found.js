const { ROUTE_NOT_FOUND } = require('../api-error-codes');
const NotFound = require('./not-found');

class RouteNotFound extends NotFound {
  constructor(routePath) {
    super(ROUTE_NOT_FOUND, `Route '${routePath}' not found`, { routePath });
  }
}

module.exports = RouteNotFound;
