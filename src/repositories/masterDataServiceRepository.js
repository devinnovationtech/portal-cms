import Repository from './Repository';

// const resource = '/master-data-services';

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
};
