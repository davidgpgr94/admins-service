const Controller = require('../controller');

const AdminNotFoundById = require('../../api-errors/not-found/admin-not-found-by-id');

const AdminWithoutSensitiveFieldsSerializer = require('../../serializers/admin-without-sensitive-fields.serializer');

const GetAdmin = require('../../../../contexts/admin/application/get-admin/get-admin');
const GetAdminQuery = require('../../../../contexts/admin/application/get-admin/get-admin-query');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');
const AdminNotFound = require('../../../../contexts/admin/domain/errors/admin-not-found');

class GetAdminController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundById(error?.data?.adminId)
  };

  /** @type {GetAdmin} */
  #getAdminUseCase;

  /** @type {AdminWithoutSensitiveFieldsSerializer} */
  #adminWithoutSensitiveFieldsSerializer;

  constructor({ getAdminUseCase, adminWithoutSensitiveFieldsSerializer }) {
    super(GetAdminController.#errorHandlers);

    this.#getAdminUseCase = getAdminUseCase;
    this.#adminWithoutSensitiveFieldsSerializer = adminWithoutSensitiveFieldsSerializer;
  }

  async run(req, res, next) {
    const { adminId:adminIdString } = req.params;

    try {
      const adminId = new AdminId(adminIdString);

      const getAdminQuery = new GetAdminQuery({ adminId });

      const { admin } = await this.#getAdminUseCase.run(getAdminQuery);

      if (!admin) throw new AdminNotFound(adminId);

      return res.status(200).json({
        admin: this.#adminWithoutSensitiveFieldsSerializer.toApiResponse(admin)
      });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = GetAdminController;
