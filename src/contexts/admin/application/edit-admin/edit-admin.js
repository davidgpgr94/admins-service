const Admin = require('../../domain/admin');
const AdminName = require('../../domain/admin-name');
const AdminSurname = require('../../domain/admin-surname');

const AdminNotFound = require('../../domain/errors/admin-not-found');

const AdminRepository = require('../../domain/services/admin-repository');
const AdminSensitiveFieldsFilter = require('../../domain/services/admin-sensitive-fields-filter');

const EditAdminCommand = require('./edit-admin-command');
const EditAdminResponse = require('./edit-admin-response');

class EditAdmin {

  #adminRepository;
  #adminSensitiveFieldsFilter;

  /**
   * @param {Object} deps
   * @param {AdminRepository} deps.adminRepository
   * @param {AdminSensitiveFieldsFilter} deps.adminSensitiveFieldsFilter
   */
  constructor({ adminRepository, adminSensitiveFieldsFilter }) {
    this.#adminRepository = adminRepository;
    this.#adminSensitiveFieldsFilter = adminSensitiveFieldsFilter
  }

  /**
   * @param {EditAdminCommand} editAdminCommand
   * @throws {AdminNotFound}
   */
  async run({ adminId, name, surname, isSuperAdmin }) {
    const currentAdmin = await this.#getCurrentAdmin(adminId);

    if (!currentAdmin) throw new AdminNotFound(adminId);

    const adminToSave = this.#updateAdmin(currentAdmin, { name, surname, isSuperAdmin });

    await this.#adminRepository.save(adminToSave);

    return new EditAdminResponse({
      adminEdited: this.#adminSensitiveFieldsFilter.filter(adminToSave)
    });
  }

  async #getCurrentAdmin(adminId) {
    return await this.#adminRepository.findById(adminId);
  }

  /**
   * @param {Admin} admin
   * @param {Object} editableFields
   * @param {AdminName|undefined} editableFields.name
   * @param {AdminSurname|undefined} editableFields.surname
   * @param {boolean|undefined} editableFields.isSuperAdmin
   *
   * @returns {Admin}
   */
  #updateAdmin(admin, { name, surname, isSuperAdmin }) {
    const admintToUpdate = admin.clone();

    if (name) admintToUpdate.changeName(name);
    if (surname) admintToUpdate.changeSurname(surname);
    if (isSuperAdmin !== undefined) admintToUpdate.changeSuperAdmin(isSuperAdmin);

    return admintToUpdate;
  }
}

module.exports = EditAdmin;
