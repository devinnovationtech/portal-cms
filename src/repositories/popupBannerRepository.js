import Repository from './Repository';

const resource = '/pop-up-banners';

export default {

  /**
   * Get Pop-up banners data
   * @param {object} params
   *
   * @property {string} q - filter banner by name
   * @property {string} status - filter banner by status
   * @property {number, string} per_page - how many banner data to show
   * @property {number, string} page - filter banner by page number
   *
   * @returns {Promise}
   */
  getBanners(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
