const Controller = require('../controller');

const AdminNotFoundById = require('../../api-errors/not-found/admin-not-found-by-id');

const AdminWithoutSensitiveFieldsSerializer = require('../../serializers/admin-without-sensitive-fields.serializer');

const EditAdmin = require('../../../../contexts/admin/application/edit-admin/edit-admin');
const EditAdminCommand = require('../../../../contexts/admin/application/edit-admin/edit-admin-command');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');
const AdminName = require('../../../../contexts/admin/domain/admin-name');
const AdminSurname = require('../../../../contexts/admin/domain/admin-surname');

class EditAdminController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundById(error?.data?.adminId)
  };

  /** @type {EditAdmin} */
  #editAdminUseCase;

  /** @type {AdminWithoutSensitiveFieldsSerializer} */
  #adminWithoutSensitiveFieldsSerializer;

  constructor({ editAdminUseCase, adminWithoutSensitiveFieldsSerializer }) {
    super(EditAdminController.#errorHandlers);

    this.#editAdminUseCase = editAdminUseCase;
    this.#adminWithoutSensitiveFieldsSerializer = adminWithoutSensitiveFieldsSerializer;
  }

  async run(req, res, next) {
    const { name, surname } = req.body;
    const { adminId:adminIdString } = req.params;

    try {
      const adminId = new AdminId(adminIdString);

      const editAdminCommand = new EditAdminCommand({
        adminId,
        name: name ? new AdminName(name) : undefined,
        surname: surname ? new AdminSurname(surname) : undefined
      });

      const { adminEdited } = await this.#editAdminUseCase.run(editAdminCommand);

      return res.status(200).json({
        adminEdited: this.#adminWithoutSensitiveFieldsSerializer.toApiResponse(adminEdited)
      });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = EditAdminController;
