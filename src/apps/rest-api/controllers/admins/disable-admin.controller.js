const Controller = require('../controller');

const AdminNotFoundById = require('../../api-errors/not-found/admin-not-found-by-id');

const DisableAdmin = require('../../../../contexts/admin/application/disable-admin/disable-admin');
const DisableAdminCommand = require('../../../../contexts/admin/application/disable-admin/disable-admin-command');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');

class DisableAdminController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundById(error?.data?.adminId)
  };

  /** @type {DisableAdmin} */
  #disableAdminUseCase;

  constructor({ disableAdminUseCase }) {
    super(DisableAdminController.#errorHandlers);

    this.#disableAdminUseCase = disableAdminUseCase;
  }

  async run(req, res, next) {
    const { adminId:adminIdString } = req.params;

    try {
      const adminId = new AdminId(adminIdString);

      const disableAdminCommand = new DisableAdminCommand({ adminId });

      const { disabled } = await this.#disableAdminUseCase.run(disableAdminCommand);

      return res.status(200).json({ enabled: !disabled });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }

}

module.exports = DisableAdminController;
