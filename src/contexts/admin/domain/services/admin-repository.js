const Criteria = require('../../../shared/domain/criteria/criteria');
const Admin = require('../admin');
const AdminEmail = require('../admin-email');
const AdminId = require('../admin-id');

class AdminRepository {

  /**
   * @param {AdminId} adminId
   * @returns {Promise<Admin|null>}
   */
  async findById(adminId) {
    throw new Error('not implemented yet');
  }

  /**
   * @param {AdminEmail} email
   * @returns {Promise<Admin|null>}
   */
  async findByEmail(email) {
    throw new Error('not implemented yet');
  }

  /**
   * @param {Criteria} criteria
   * @returns {Promise<Admin[]>}
   */
  async findAll(criteria) {
    throw new Error('not implemented yet');
  }

  /**
   * @returns {Promise<Number>}
   */
  async countAll() {
    throw new Error('not implemented yet');
  }

  /**
   * @param {Admin} admin
   */
  async save(admin) {
    throw new Error('not implemented yet');
  }
}

module.exports = AdminRepository;
