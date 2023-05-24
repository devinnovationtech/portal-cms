import Repository from './Repository';

const resource = '/master-data-publications';

export default {
  /**
   * Get publiaction data list
   * @param {object} params
   *
   * @property {string} q - filter publication by
   * @property {number, string} per_page - how many publication data to show
   * @property {number, string} page - filter publication by page number
   *
   * Get publiaction list
   * @returns {Promise}
   */
  getPublicationList(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
  /**
   * Delete publication by publication ID
   * @param {number} id - ID of the publication
   *
   * @returns {Promise}
   */
  deletePublicationById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },
  /**
   * Get publication status counter
   * @returns {Promise}
   */
  getStatusCounter() {
    return Repository.get(`${resource}/tabs`);
  },
  /**
   * get publication by publication ID
   * @param {number} id - ID of the publication
   *
   * @returns {Promise}
   */
  getPublicationById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },
};
