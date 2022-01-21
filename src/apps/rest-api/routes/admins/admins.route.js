const {
  validate,
  admins: {
    createAdminValidator,
    getAdminsValidator,
    getAdminValidator
  }
} = require('../../validators');

const BASE_PATH = '/admins';

module.exports = ({ container, router }) => {
  const createAdminController = container.resolve('createAdminController');
  const getAdminsController = container.resolve('getAdminsController');
  const getAdminController = container.resolve('getAdminController');

  router.get(BASE_PATH, validate(getAdminsValidator), getAdminsController.run.bind(getAdminsController));
  router.get(`${BASE_PATH}/:adminId`, validate(getAdminValidator), getAdminController.run.bind(getAdminController));
  router.post(BASE_PATH, validate(createAdminValidator), createAdminController.run.bind(createAdminController));
}
