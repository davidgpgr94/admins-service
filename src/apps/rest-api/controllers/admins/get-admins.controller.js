const Controller = require('../controller');

const AdminNotFoundByEmail = require('../../api-errors/not-found/admin-not-found-by-email');

const AdminWithoutSensitiveFieldsSerializer = require('../../serializers/admin-without-sensitive-fields.serializer');

const GetAdmins = require('../../../../contexts/admin/application/get-admins/get-admins');
const GetAdminsQuery = require('../../../../contexts/admin/application/get-admins/get-admins-query');

const GetAdmin = require('../../../../contexts/admin/application/get-admin/get-admin');
const GetAdminQuery = require('../../../../contexts/admin/application/get-admin/get-admin-query');

const Criteria = require('../../../../contexts/shared/domain/criteria/criteria');
const Page = require('../../../../contexts/shared/domain/criteria/page/page');

const AdminEmail = require('../../../../contexts/admin/domain/admin-email');
const AdminNotFound = require('../../../../contexts/admin/domain/errors/admin-not-found');

class GetAdminsController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundByEmail(error?.data?.adminEmail)
  };

  /** @type {GetAdmins} */
  #getAdminsUseCase;

  /** @type {GetAdmin} */
  #getAdminUseCase;

  /** @type {AdminWithoutSensitiveFieldsSerializer} */
  #adminWithoutSensitiveFieldsSerializer;

  constructor({ getAdminsUseCase, getAdminUseCase, adminWithoutSensitiveFieldsSerializer }) {
    super(GetAdminsController.#errorHandlers);

    this.#getAdminsUseCase = getAdminsUseCase;
    this.#getAdminUseCase = getAdminUseCase;

    this.#adminWithoutSensitiveFieldsSerializer = adminWithoutSensitiveFieldsSerializer;
  }

  async run(req, res, next) {
    const { page:pageNumber, email } = req.query;

    const criteria = new Criteria({
      page: Page.createPageNumber(pageNumber)
    });

    try {
      if (email) {
        const adminEmail = new AdminEmail(email);

        const getAdminQuery = new GetAdminQuery({ adminEmail });

        const { admin } = await this.#getAdminUseCase.run(getAdminQuery);

        if (!admin) throw new AdminNotFound(adminEmail);

        return res.status(200).json({
          admin: this.#adminWithoutSensitiveFieldsSerializer.toApiResponse(admin)
        });
      }

      const getAdminsQuery = new GetAdminsQuery({ criteria });

      const { admins, totalAdmins } = await this.#getAdminsUseCase.run(getAdminsQuery);

      return res.status(200).json({
        admins: admins.map(this.#adminWithoutSensitiveFieldsSerializer.toApiResponse),
        page: pageNumber,
        adminsPerPage: criteria.page.limit.value,
        totalAdmins
      });
    } catch (error) {
      console.error(error);
      return next(this.errorHandler(error));
    }
  }
}

module.exports = GetAdminsController;
