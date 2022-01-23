const {
  validate,
  auth: {
    checkCredentialsValidator,
    requestRestorePasswordValidator,
    restorePasswordValidator
  }
} = require('../../validators');

const BASE_PATH = '/auth';

module.exports = ({
  router,
  checkCredentialsController,
  requestRestorePasswordController,
  restorePasswordController
}) => {

  router.post(`${BASE_PATH}/check-credentials`, validate(checkCredentialsValidator), checkCredentialsController.run.bind(checkCredentialsController));
  router.post(`${BASE_PATH}/request-restore-password`, validate(requestRestorePasswordValidator), requestRestorePasswordController.run.bind(requestRestorePasswordController));
  router.post(`${BASE_PATH}/restore-password`, validate(restorePasswordValidator), restorePasswordController.run.bind(restorePasswordController));
}
