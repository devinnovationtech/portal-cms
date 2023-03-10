import Repository from './Repository';

const resource = '/master-data-services';

export default {
  /**
   * Get goverment affairs list
   * @returns {Promise}
   */
  getGovernmentAffairs() {
    return Repository.get('/government_affairs');
  },
  /**
   * Get SPBE RAL list
   * @returns {Promise}
   */
  getSPBERALs() {
    return Repository.get('/spbe_rals');
  },
  /**
   * Get UPTD Cabdin list
   * @returns {Promise}
   */
  getOrganizations() {
    return Repository.get('/uptd_cabdins');
  },
  /**
   * Get Master Data List
   * @param {object} params
   *
   * @property {string} q - filter master data by name
   * @property {number, string} per_page - how many master data data to show
   * @property {number, string} page - filter master data by page number
   *
   * @returns {Promise}
   */
  getMasterDataList(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
