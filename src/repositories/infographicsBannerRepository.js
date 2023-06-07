import Repository from './Repository';

const resource = '/infographic-banners';

export default {

  /**
   * Get Infographics banners data
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
   * Get Infographics banners data by banner ID
   * @param {number, string} id - ID of the banner data
   *
   * @returns {Promise}
   */
  getBannerById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * Delete Infographics banners data by banner ID
   * @param {number, string} id - ID of the banner
   *
   * @returns {Promise}
   */
  deleteBannerById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },

  /** Create Banner
   * @param {Object} body
   *
   * @property {Object} image - contain property { dekstop, mobile }
   * @property {string} title
   * @property {Object} custom_button - contain property { label, link }
   * @property {Object} scheduler - contain property { duration, start_date }
   *
   * @returns {Promise}
   */
  createBanner(body) {
    return Repository.post(`${resource}`, body);
  },

  /** Update Banner
   * @param {number} id
   * @param {Object} body
   *
   * @property {Object} image - contain property { dekstop, mobile }
   * @property {string} title
   * @property {Object} custom_button - contain property { label, link }
   * @property {Object} scheduler - contain property { duration, start_date }
   *
   * @returns {Promise}
   */
  updateBanner(id, body) {
    return Repository.put(`${resource}/${id}`, body);
  },

  /** Update Banner Status by Id
   * @param {number} id
   * @param {Object} body
   *
   * @property {Object} is_active
   *
   * @returns {Promise}
   */
  updateBannerStatusById(id, body) {
    return Repository.patch(`${resource}/${id}/status`, body);
  },
};
