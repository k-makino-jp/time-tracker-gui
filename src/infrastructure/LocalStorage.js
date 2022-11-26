/**
 * @description Access to local storage.
 */
class LocalStorage {
  /**
   * @description Get value with key.
   * @param {String} key
   * @return {String}
   */
  get(key) {
    return localStorage.getItem(key);
  }

  /**
   * @description Create a new key/value pair.
   * @param {String} key
   * @param {*} value
   * @return {String}
   */
  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @description Delete a specified key and value.
   * @param {String} key
   */
  delete(key) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorage();