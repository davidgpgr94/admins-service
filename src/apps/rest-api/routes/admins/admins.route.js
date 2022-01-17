const {
  validate,
  admins: {
    createAdminValidator
  }
} = require('../../validators');

const BASE_PATH = '/admins';

module.exports = ({ container, router }) => {
  const createAdminController = container.resolve('createAdminController');

  router.post(BASE_PATH, validate(createAdminValidator), createAdminController.run.bind(createAdminController));
}
