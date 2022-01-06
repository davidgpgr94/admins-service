const { hashSync, compareSync } = require('bcrypt');
const AdminPassword = require('../../domain/admin-password');
const PasswordEncryptor = require('../../domain/services/password-encryptor');

class BcryptPasswordEncryptor extends PasswordEncryptor {
  static SALT_ROUNDS = 10;

  /**
   * @param {AdminPassword} rawPassword
   * @returns {string}
   */
  encrypt(rawPassword) {
    return hashSync(rawPassword.value, BcryptPasswordEncryptor.SALT_ROUNDS);
  }

  /**
   * @param {AdminPassword} hashedPassword
   * @param {AdminPassword} rawPassword
   * @returns {boolean}
   */
  compare(hashedPassword, rawPassword) {
    return compareSync(rawPassword.value, hashedPassword.value);
  }
}

module.exports = BcryptPasswordEncryptor;
