import Repository from './Repository';

const resource = '/quick-accesses';
const resourceLogo = '/logos';

export default {

  /**
   * Get Quick Link data
   * @param {object} params
   *
   * @property {string} q - filter link by name
   * @property {string} status - filter link by status
   * @property {number, string} per_page - how many link data to show
   * @property {number, string} page - filter link by page number
   *
   * @returns {Promise}
   */
  getLinks(params = {}) {
    return Repository.get(`${resource}`, { params });
  },

  /**
   * Get Quick Link data by link ID
   * @param {number, string} id - ID of the link data
   *
   * @returns {Promise}
   */
  getLinkById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * Delete Quick Link data by link ID
   * @param {number, string} id - ID of the link
   *
   * @returns {Promise}
   */
  deleteLinkById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },

  /** Create Quick Link
   * @param {Object} body
   *
   * @property {Object} image
   * @property {string} title
   * @property {string} description
   * @property {string} link - redirect link
   * @property {boolean} is_active
   *
   * @returns {Promise}
   */
  createLink(body) {
    return Repository.post(`${resource}`, body);
  },

  /** Update Quick Link
   * @param {number} id
   * @param {Object} body
   *
   * @property {Object} image
   * @property {string} title
   * @property {string} description
   * @property {string} link - redirect link
   * @property {boolean} is_active
   *
   * @returns {Promise}
   */
  updateLink(id, body) {
    return Repository.put(`${resource}/${id}`, body);
  },

  /** Update Quick Link Status by Id
   * @param {number} id
   * @param {Object} body
   *
   * @property {Object} is_active
   *
   * @returns {Promise}
   */
  updateLinkStatusById(id, body) {
    return Repository.patch(`${resource}/${id}/status`, body);
  },

  /**
   * Get Quick Link data Icon List
   * @param {object} params
   *
   * @property {string} q - filter icon by name
   * @property {number, string} per_page - how many icon data to show
   * @property {number, string} page - filter icon by page number
   *
   * @returns {Promise}
   */
  getListIcon(params = {}) {
    return Repository.get(`${resourceLogo}`, { params });
  },
};
