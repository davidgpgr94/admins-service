class ChangePasswordResponse {

  /** @type {boolean} */
  #wasChanged;

  constructor({ wasChanged }) {
    this.#wasChanged = wasChanged;
  }

  get wasChanged() {
    return this.#wasChanged;
  }
}

module.exports = ChangePasswordResponse;
