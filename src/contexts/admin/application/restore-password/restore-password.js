const Admin = require('../../domain/admin');
const AdminPassword = require('../../domain/admin-password');

const Token = require('../../../shared/domain/token/token');
const NotEmptyStringValueObject = require('../../../shared/domain/value-objects/not-empty-string-value-object');

const AdminRepository = require('../../domain/services/admin-repository');
const PasswordEncryptor = require('../../domain/services/password-encryptor');
const TokenEncryptor = require('../../../shared/domain/token/services/token-encryptor');

const AdminNotFound = require('../../domain/errors/admin-not-found');

const RestorePasswordCommand = require('./restore-password-command');
const RestorePasswordResponse = require('./restore-password-response');

class RestorePassword {

  #adminRepository;
  #passwordEncryptor;
  #tokenEncryptor;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   * @param {PasswordEncryptor} deps.passwordEncryptor
   * @param {TokenEncryptor} deps.tokenEncryptor
   */
  constructor({ adminRepository, passwordEncryptor, tokenEncryptor }) {
    this.#adminRepository = adminRepository;
    this.#passwordEncryptor = passwordEncryptor;
    this.#tokenEncryptor = tokenEncryptor;
  }

  /**
   * @param {RestorePasswordCommand} restorePasswordCommand
   * @throws {TokenNotValid}
   */
  async restorePassword({ token, newPassword, confirmPassword }) {
    const restorePasswordToken = this.#decodeTokenToRestorePasswordToken(token);

    const admin = await this.#getAdminFromToken(restorePasswordToken);

    if (!admin) {
      throw new AdminNotFound(restorePasswordToken.adminId);
    }

    this.#ensureIsValidTokenForAdmin(token, admin);

    const areNewAndConfirmTheSame = newPassword.equal(confirmPassword);

    if (!areNewAndConfirmTheSame) return new RestorePasswordResponse({ wasRestored: false });

    await this.#changePassword(admin, newPassword);

    return new RestorePasswordResponse({ wasRestored: true });
  }

  /** @param {Token} token */
  #decodeTokenToRestorePasswordToken(token) {
    return this.#tokenEncryptor.decode(token);
  }

  /**
   * @param {Token} token
   * @returns {Promise<Admin>}
   */
  async #getAdminFromToken(token) {
    return await this.#adminRepository.findById(token.adminId);
  }

  /**
   * @param {NotEmptyStringValueObject} encryptedToken
   * @param {Admin} admin
   */
  #ensureIsValidTokenForAdmin(encryptedToken, admin) {
    this.#tokenEncryptor.decodeAndVerify(encryptedToken, admin.password);
  }

  /**
   * @param {Admin} admin
   * @param {AdminPassword} newRawPassword
   */
  async #changePassword(admin, newRawPassword) {
    const newHashedPasswordString = this.#passwordEncryptor.encrypt(newRawPassword);
    const newHashedPassword = new AdminPassword(newHashedPasswordString);

    admin.changePassword(newHashedPassword);

    await this.#adminRepository.save(admin);
  }
}

module.exports = RestorePassword;
