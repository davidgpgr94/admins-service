const Controller = require('../controller');

const AdminNotFoundById = require('../../api-errors/not-found/admin-not-found-by-id');

const EnableAdmin = require('../../../../contexts/admin/application/enable-admin/enable-admin');
const EnableAdminCommand = require('../../../../contexts/admin/application/enable-admin/enable-admin-command');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');

class EnableAdminController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundById(error?.data?.adminId)
  };

  /** @type {EnableAdmin} */
  #enableAdminUseCase;

  constructor({ enableAdminUseCase }) {
    super(EnableAdminController.#errorHandlers);

    this.#enableAdminUseCase = enableAdminUseCase;
  }

  async run(req, res, next) {
    const { adminId:adminIdString } = req.params;

    try {
      const adminId = new AdminId(adminIdString);

      const enableAdminCommand = new EnableAdminCommand({ adminId });

      const { enabled } = await this.#enableAdminUseCase.run(enableAdminCommand);

      return res.status(200).json({ enabled });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = EnableAdminController;
