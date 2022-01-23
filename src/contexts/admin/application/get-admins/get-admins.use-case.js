const Admin = require('../../domain/admin');
const AdminWithoutSensitiveFields = require('../../domain/admin-without-sensitive-fields');

const AdminRepository = require('../../domain/services/admin-repository');
const AdminSensitiveFieldsFilter = require('../../domain/services/admin-sensitive-fields-filter');

const GetAdminsQuery = require('./get-admins-query');
const GetAdminsResponse = require('./get-admins-response');

class GetAdminsUseCase {

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
   * @param {GetAdminsQuery} getADminsQuery
   */
  async run({ criteria }) {
    const admins = await this.#adminRepository.findAll(criteria);

    const totalAdmins = await this.#adminRepository.countAll(criteria);

    const adminsWithoutSensitiveData = this.#filterSensitiveAdminsData(admins);

    return new GetAdminsResponse({
      admins: adminsWithoutSensitiveData,
      totalAdmins
    });
  }

  /**
   * @param {Admin[]} admins
   *
   * @returns {AdminWithoutSensitiveFields[]}
   */
  #filterSensitiveAdminsData(admins) {
    return admins.map(admin => this.#adminSensitiveFieldsFilter.filter(admin));
  }
}

module.exports = GetAdminsUseCase;
