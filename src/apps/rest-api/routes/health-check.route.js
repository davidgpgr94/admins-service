module.exports = ({ container, router }) => {
  const healthCheckController = container.resolve('healthCheckController');

  router.get('/health-check', healthCheckController.run.bind(healthCheckController));
}
