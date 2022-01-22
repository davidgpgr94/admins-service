const {
  validate,
  admins: {
    createAdminValidator,
    getAdminsValidator,
    getAdminValidator,
    enableAdminValidator,
    disableAdminValidator
  }
} = require('../../validators');

const BASE_PATH = '/admins';

module.exports = ({ container, router }) => {
  const createAdminController = container.resolve('createAdminController');
  const getAdminsController = container.resolve('getAdminsController');
  const getAdminController = container.resolve('getAdminController');
  const enableAdminController = container.resolve('enableAdminController');
  const disableAdminController = container.resolve('disableAdminController');

  router.get(BASE_PATH, validate(getAdminsValidator), getAdminsController.run.bind(getAdminsController));
  router.get(`${BASE_PATH}/:adminId`, validate(getAdminValidator), getAdminController.run.bind(getAdminController));
  router.put(`${BASE_PATH}/:adminId/enable`, validate(enableAdminValidator), enableAdminController.run.bind(enableAdminController));
  router.put(`${BASE_PATH}/:adminId/disable`, validate(disableAdminValidator), disableAdminController.run.bind(disableAdminController));
  router.post(BASE_PATH, validate(createAdminValidator), createAdminController.run.bind(createAdminController));
}
