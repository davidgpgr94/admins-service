const {
  validate,
  admins: {
    createAdminValidator,
    getAdminsValidator,
    getAdminValidator,
    enableAdminValidator,
    disableAdminValidator,
    editAdminValidator,
    changeAdminPasswordValidator
  }
} = require('../../validators');

const BASE_PATH = '/admins';

module.exports = ({
  router,
  createAdminController,
  getAdminsController,
  getAdminController,
  enableAdminController,
  disableAdminController,
  editAdminController,
  changeAdminPasswordController
}) => {

  router.get(BASE_PATH, validate(getAdminsValidator), getAdminsController.run.bind(getAdminsController));
  router.get(`${BASE_PATH}/:adminId`, validate(getAdminValidator), getAdminController.run.bind(getAdminController));
  router.put(`${BASE_PATH}/:adminId`, validate(editAdminValidator), editAdminController.run.bind(editAdminController));
  router.put(`${BASE_PATH}/:adminId/enable`, validate(enableAdminValidator), enableAdminController.run.bind(enableAdminController));
  router.put(`${BASE_PATH}/:adminId/disable`, validate(disableAdminValidator), disableAdminController.run.bind(disableAdminController));
  router.patch(`${BASE_PATH}/:adminId/password`, validate(changeAdminPasswordValidator), changeAdminPasswordController.run.bind(changeAdminPasswordController));
  router.post(BASE_PATH, validate(createAdminValidator), createAdminController.run.bind(createAdminController));
}
