module.exports = ({ router, healthCheckController }) => {

  router.get('/health-check', healthCheckController.run.bind(healthCheckController));
}
