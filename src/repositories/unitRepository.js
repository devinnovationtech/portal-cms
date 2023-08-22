import Repository from './Repository';

const resource = '/units';

export default {
  /**
   * Get Opd Name List
   * @param {object} params
   *
   * @property {string} q - filter opd name by
   * @property {number, string} per_page - how many opd data to show
   * @property {number, string} page - filter opd by page number
   *
   * Get OPD list
   * @returns {Promise}
   */
  getUnitLists(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
