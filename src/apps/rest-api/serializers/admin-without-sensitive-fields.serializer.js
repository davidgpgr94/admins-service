const Serializer = require('./serializer');

const AdminWithoutSensitiveFields = require('../../../contexts/admin/domain/admin-without-sensitive-fields');

class AdminWithoutSensitiveFieldsSerializer extends Serializer {

  /**
   * @param {AdminWithoutSensitiveFields} admin
   * @returns {Object}
   */
  toApiResponse(admin) {
    const { id, name, surname, email, isEnabled, isSuperAdmin } = admin;

    return {
      id: id.value,
      name: name.value,
      surname: surname.value,
      email: email.value,
      isEnabled: isEnabled,
      isSuperAdmin: isSuperAdmin
    };
  }
}

module.exports = AdminWithoutSensitiveFieldsSerializer;
