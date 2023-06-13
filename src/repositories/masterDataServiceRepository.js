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
   * Get Master data list with status `ARCHIVE`
   * @returns {Promise}
   */
  getArchivedMasterData() {
    return Repository.get(`${resource}/archives`);
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

  /**
   * Store Master Data
   * @returns {Promise}
   */
  createMasterData(body) {
    return Repository.post(`${resource}`, body);
  },

  /**
   * Get master data status counter
   * @returns {Promise}
   */
  getStatusCounter() {
    return Repository.get(`${resource}/tabs`);
  },
  /**
   * Delete master data by master data ID
   * @param {number} id - ID of the master data
   *
   * @returns {Promise}
   */
  deleteMasterDataById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },
  /**
   * get master data by master data ID
   * @param {number} id - ID of the master data
   *
   * @returns {Promise}
   */
  getMasterDataById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * update Master Data
   * @param {object} body - form request body
   * @param {number} id - ID of the master data

   * @returns {Promise}
   */
  updateMasterData(body, id = null) {
    return Repository.put(`${resource}/${id}`, body);
  },
};
