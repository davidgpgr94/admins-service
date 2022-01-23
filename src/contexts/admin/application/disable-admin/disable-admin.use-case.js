const AdminNotFound = require('../../domain/errors/admin-not-found');

const AdminRepository = require('../../domain/services/admin-repository');

const DisableAdminCommand = require('./disable-admin-command');
const DisableAdminResponse = require('./disable-admin-response');

class DisableAdminUseCase {

  #adminRepository;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   */
  constructor({ adminRepository }) {
    this.#adminRepository = adminRepository;
  }

  /**
   * @param {DisableAdminCommand} disableAdminCommand
   * @throws {AdminNotFound}
   */
  async run({ adminId }) {
    const admin = await this.#fetchAdmin(adminId);

    if (!admin) throw new AdminNotFound(adminId);

    if (!admin.isEnabled) return new DisableAdminResponse({ disabled: true });

    admin.disable();

    await this.#adminRepository.save(admin);

    return new DisableAdminResponse({ disabled: true });
  }

  async #fetchAdmin(adminId) {
    return this.#adminRepository.findById(adminId);
  }
}

module.exports = DisableAdminUseCase;
