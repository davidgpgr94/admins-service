const AdminId = require('../../../shared/domain/admin/admin-id');
const Admin = require('../../domain/admin');
const AdminPassword = require('../../domain/admin-password');

const AdminNotFound = require('../../domain/errors/admin-not-found');
const InvalidPasswordError = require('../../domain/errors/invalid-password-error');
const PasswordConfirmationNotMatch = require('../../domain/errors/password-confirmation-not-match');

const AdminRepository = require('../../domain/services/admin-repository');
const PasswordEncryptor = require('../../domain/services/password-encryptor');

const ChangePasswordCommand = require('./change-password-command');
const ChangePasswordResponse = require('./change-password-response');

class ChangePassword {

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
   * @param {ChangePasswordCommand} changePasswordCommand
   * @throws {AdminNotFound}
   * @throws {InvalidPasswordError}
   * @throws {PasswordConfirmationNotMatch}
   */
  async run({ adminId, oldPassword, newPassword, confirmPassword }) {
    /** @type {Admin} */
    const admin = await this.#getAdminById(adminId);

    if (!admin) {
      throw new AdminNotFound(adminId);
    }

    this.#ensureOldPasswordIsCorrect(admin, oldPassword);

    this.#ensureNewAndConfirmationPasswordsMatch(newPassword, confirmPassword);

    await this.#changePassword(admin, newPassword);

    return new ChangePasswordResponse({ wasChanged: true });
  }

  /** @param {AdminId} adminId */
  async #getAdminById(adminId) {
    return await this.#adminRepository.findById(adminId);
  }

  /**
   * @param {Admin} admin
   * @param {AdminPassword} oldRawPassword
   */
  #ensureOldPasswordIsCorrect(admin, oldRawPassword) {
    const ok = this.#passwordEncryptor.compare(admin.password, oldRawPassword);

    if (!ok) throw new InvalidPasswordError();
  }

  /**
   * @param {AdminPassword} newPassword
   * @param {AdminPassword} confirmPassword
   *
   * @throws {PasswordConfirmationNotMatch}
   */
  #ensureNewAndConfirmationPasswordsMatch(newPassword, confirmPassword) {
    const areNewAndConfirmTheSame = newPassword.equal(confirmPassword);

    if (!areNewAndConfirmTheSame) throw new PasswordConfirmationNotMatch();
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

module.exports = ChangePassword;
