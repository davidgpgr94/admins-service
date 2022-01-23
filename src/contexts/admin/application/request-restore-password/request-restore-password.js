const AdminRepository = require('../../domain/services/admin-repository');

const TokenEncryptor = require('../../../shared/domain/token/services/token-encryptor');

const AdminNotFound = require('../../domain/errors/admin-not-found');

const RequestRestorePasswordCommand = require('./request-restore-password-command');
const RequestRestorePasswordResponse = require('./request-restore-password-response');
const Token = require('../../../shared/domain/token/token');

class RequestRestorePassword {

  #adminRepository;
  #tokenEncryptor;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   * @param {TokenEncryptor} deps.tokenEncryptor
   */
  constructor({ adminRepository, tokenEncryptor }) {
    this.#adminRepository = adminRepository;
    this.#tokenEncryptor = tokenEncryptor;
  }

  /**
   * @param {RequestRestorePasswordCommand} requestRestorePasswordCommand
   * @throws {AdminNotFound}
   */
  async run({ adminEmail }) {
    const admin = await this.#getAdminByEmail(adminEmail);

    if (!admin) {
      throw new AdminNotFound(adminEmail);
    }

    const restorePasswordToken = Token.generate(admin.id, admin.password);

    const token = this.#tokenEncryptor.encrypt(restorePasswordToken);

    return new RequestRestorePasswordResponse({ token });
  }

  async #getAdminByEmail(adminEmail) {
    return await this.#adminRepository.findByEmail(adminEmail);
  }
}

module.exports = RequestRestorePassword;
