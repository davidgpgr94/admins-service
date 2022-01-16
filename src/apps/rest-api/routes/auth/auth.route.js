
const {
  validate,
  auth: {
    checkCredentialsValidator
  }
} = require('../../validators');

const BASE_PATH = '/auth';

module.exports = ({ container, router }) => {

  const checkCredentialsController = container.resolve('checkCredentialsController');

  router.post(`${BASE_PATH}/check-credentials`, validate(checkCredentialsValidator), checkCredentialsController.run.bind(checkCredentialsController));
}
