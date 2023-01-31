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

  /**
   * Get Pop-up banners data by banner ID
   * @param {number, string} id - ID of the banner data
   *
   * @returns {Promise}
   */
  getBannerById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * Delete Pop-up banners data by banner ID
   * @param {number, string} id - ID of the banner
   *
   * @returns {Promise}
   */
  deleteBannerById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },
};
