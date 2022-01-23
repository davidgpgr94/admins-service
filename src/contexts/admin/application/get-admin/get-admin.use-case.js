const AdminRepository = require('../../domain/services/admin-repository');
const AdminSensitiveFieldsFilter = require('../../domain/services/admin-sensitive-fields-filter');

const GetAdminQuery = require('./get-admin-query');
const GetAdminResponse = require('./get-admin-response');

class GetAdminUseCase {

  #adminRepository;
  #adminSensitiveFieldsFilter;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   * @param {AdminSensitiveFieldsFilter} deps.adminSensitiveFieldsFilter
   */
  constructor({ adminRepository, adminSensitiveFieldsFilter }) {
    this.#adminRepository = adminRepository;
    this.#adminSensitiveFieldsFilter = adminSensitiveFieldsFilter;
  }

  /**
   * @param {GetAdminQuery} getAdminQuery
   */
  async run({ adminId, adminEmail }) {
    const admin = await this.#fetchAdmin(adminId, adminEmail);

    if (!admin) return new GetAdminResponse({});

    return new GetAdminResponse({
      admin: this.#adminSensitiveFieldsFilter.filter(admin)
    });
  }

  async #fetchAdmin(adminId, adminEmail) {
    if (adminId)
      return this.#adminRepository.findById(adminId);
    else if (adminEmail)
      return this.#adminRepository.findByEmail(adminEmail);

    return null;
  }
}

module.exports = GetAdminUseCase;
