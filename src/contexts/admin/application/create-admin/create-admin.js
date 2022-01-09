const AdminId = require('../../../shared/domain/admin/admin-id');
const Admin = require('../../domain/admin');
const AdminEmail = require('../../domain/admin-email');
const AdminPassword = require('../../domain/admin-password');

const EmailAlreadyUsed = require('../../domain/errors/email-already-used');
const PasswordTooShort = require('../../domain/errors/password-too-short');

const AdminRepository = require('../../domain/services/admin-repository');
const PasswordEncryptor = require('../../domain/services/password-encryptor');

const CreateAdminCommand = require('./create-admin-command');
const CreateAdminResponse = require('./create-admin-response');

class CreateAdmin {

  #adminRepository;
  #passwordEncryptor;

  /**
   * @param {Object} o
   * @param {AdminRepository} o.adminRepository
   * @param {PasswordEncryptor} o.passwordEncryptor
   */
  constructor({ adminRepository, passwordEncryptor }) {
    this.#adminRepository = adminRepository;
    this.#passwordEncryptor = passwordEncryptor;
  }

  /**
   * @param {CreateAdminCommand} createAdminCommand
   * @throws {EmailAlreadyUsed}
   * @throws {PasswordTooShort}
   */
  async run({ name, surname, email, rawPassword, isSuperAdmin }) {
    await this.#ensureEmailIsUnique(email);

    this.#ensurePasswordMinLength(rawPassword);

    const hashedPassword = this.#hashPassword(rawPassword);

    const adminId = this.#generateAdminId();
    const admin = this.#createAdmin(adminId, name, surname, email, hashedPassword, isSuperAdmin);

    await this.#saveAdmin(admin);

    return new CreateAdminResponse({ adminId });
  }

  /**
   * @param {AdminEmail} email
   */
  #ensureEmailIsUnique(email) {
    const adminWithSameEmail = await this.#adminRepository.findByEmail(email);

    if (adminWithSameEmail) {
      throw new EmailAlreadyUsed(email);
    }
  }

  /** @param {AdminPassword} rawPassword */
  #ensurePasswordMinLength(rawPassword) {
    if (rawPassword.value.length < AdminPassword.MIN_LENGTH) {
      throw new PasswordTooShort(rawPassword.value.length);
    }
  }

  /** @param {AdminPassword} rawPassword */
  #hashPassword(rawPassword) {
    const hashedPassword = this.#passwordEncryptor.encrypt(rawPassword);

    return new AdminPassword(hashedPassword);
  }

  #generateAdminId() {
    return AdminId.generate();
  }

  #createAdmin(adminId, name, surname, email, hashedPassword, isSuperAdmin) {
    return new Admin({
      id: adminId,
      email,
      name,
      surname,
      password: hashedPassword,
      isSuperAdmin,
      isEnabled: true
    });
  }

  async #saveAdmin(admin) {
    await this.#adminRepository.save(admin);
  }
}

module.exports = CreateAdmin;
