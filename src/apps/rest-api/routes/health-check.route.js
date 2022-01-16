module.exports = ({ container, router }) => {
  const healthCheckController = container.resolve('HealthCheckController');

  router.get('/health-check', healthCheckController.run.bind(healthCheckController));
}
