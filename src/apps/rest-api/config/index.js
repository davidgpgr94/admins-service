const env = process.env.NODE_ENV || 'dev';

const dev = Object.freeze({
  port: process.env.API_PORT || 3000,
  routesPrefix: process.env.API_ROUTES_PREFIX || '/api',
  fullHealthCheck: true,
  debugErrors: process.env.API_DEBUG_ERRORS || false,
  logs: {
    requestsLogsFormat: ":method :url :status :res[content-length] - :response-time ms"
  },
  security: {
    header: process.env.API_KEY_HEADER || 'Authorization',
    apiKey: process.env.API_KEY || 'querty'
  }
})

const prod = Object.freeze({
  port: process.env.API_PORT || 3000,
  routesPrefix: process.env.API_ROUTES_PREFIX || '/api',
  fullHealthCheck: false,
  debugErrors: process.env.API_DEBUG_ERRORS || true,
  logs: {
    requestsLogsFormat: ":method :url :status :res[content-length] - :response-time ms"
  },
  security: {
    header: process.env.API_KEY_HEADER || 'Authorization',
    apiKey: process.env.API_KEY
  }
})

const config = Object.freeze({
  dev,
  prod
});

module.exports = config[env];
