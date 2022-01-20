const {
  validate,
  admins: {
    createAdminValidator,
    getAdminsValidator
  }
} = require('../../validators');

const BASE_PATH = '/admins';

module.exports = ({ container, router }) => {
  const createAdminController = container.resolve('createAdminController');
  const getAdminsController = container.resolve('getAdminsController');

  router.get(BASE_PATH, validate(getAdminsValidator), getAdminsController.run.bind(getAdminsController));
  router.post(BASE_PATH, validate(createAdminValidator), createAdminController.run.bind(createAdminController));
}
