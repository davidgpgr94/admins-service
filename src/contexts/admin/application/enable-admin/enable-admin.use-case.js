const AdminNotFound = require('../../domain/errors/admin-not-found');

const AdminRepository = require('../../domain/services/admin-repository');

const EnableAdminCommand = require('./enable-admin-command');
const EnableAdminResponse = require('./enable-admin-response');

class EnableAdminUseCase {

  #adminRepository;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   */
  constructor({ adminRepository }) {
    this.#adminRepository = adminRepository;
  }

  /**
   * @param {EnableAdminCommand} enableAdminCommand
   */
  async run({ adminId }) {
    const admin = await this.#fetchAdmin(adminId);

    if (!admin) throw new AdminNotFound(adminId);

    if (admin.isEnabled) return new EnableAdminResponse({ enabled: true });

    admin.enable();

    await this.#adminRepository.save(admin);

    return new EnableAdminResponse({ enabled: true });
  }

  async #fetchAdmin(adminId) {
    return this.#adminRepository.findById(adminId);
  }
}

module.exports = EnableAdminUseCase;
