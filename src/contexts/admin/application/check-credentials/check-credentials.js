const AdminRepository = require('../../domain/services/admin-repository');
const PasswordEncryptor = require('../../domain/services/password-encryptor');

const CheckCredentialsQuery = require('./check-credentials-query');
const CheckCredentialsResponse = require('./check-credentials-response');

class CheckCredentials {

  #adminRepository;
  #passwordEncryptor;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   * @param {PasswordEncryptor} deps.passwordEncryptor
   */
  constructor({ adminRepository, passwordEncryptor }) {
    this.#adminRepository = adminRepository;
    this.#passwordEncryptor = passwordEncryptor;
  }

  /**
   * @param {CheckCredentialsQuery} checkCredentialsQuery
   */
  async run({ email, rawPassword }) {
    const admin = await this.#findAdminByEmail(email);

    if (!admin) {
      return new CheckCredentialsResponse({ areCorrect: false });
    }

    const areCredentialsCorrect = this.#compareHashedPasswordWithRaw(admin.password, rawPassword);

    return new CheckCredentialsResponse({ areCorrect: areCredentialsCorrect });
  }

  async #findAdminByEmail(email) {
    return await this.#adminRepository.findByEmail(email);
  }

  #compareHashedPasswordWithRaw(hashedPassword, rawPassword) {
    return this.#passwordEncryptor.compare(hashedPassword, rawPassword);
  }
}

module.exports = CheckCredentials;
