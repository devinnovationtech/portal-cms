import Repository from './Repository';

const resource = '/units';

export default {
  /**
   * Get Opd Name List
   *
   * @returns {Promise}
   */
  getUnitLists() {
    return Repository.get(resource);
  },
};
