const AdminPassword = require('../admin-password');

class PasswordEncryptor {

  /**
   * @param {AdminPassword} rawPassword
   * @returns {string}
   */
  encrypt(rawPassword) {
    throw new Error('not implemented yet');
  }

  /**
   * @param {AdminPassword} hashedPassword
   * @param {AdminPassword} rawPassword
   * @returns {boolean}
   */
  compare(hashedPassword, rawPassword) {
    throw new Error('not implemented yet');
  }
}

module.exports = PasswordEncryptor;
