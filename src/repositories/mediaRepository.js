import Repository from './Repository';

const resource = '/media';

export default {
  /**
   * Upload media
   * @param {Object} formData
   * @returns {Promise}
   */
  uploadMedia(formData, params) {
    return Repository.post(`${resource}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params,
    });
  },

  uploadMediaWithProgress(formData, callback, params) {
    const config = {
      onUploadProgress(progressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        callback(progress);
      },
    };
    return Repository.post(`${resource}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params,
      ...config,
    });
  },

  /**
   * Delete media
   * @param {Object} formData
   *
   * @property {string} key - media key/name
   * @property {string} domain - media domain
   *
   * @returns {Promise}
   */
  deleteMedia(formData) {
    return Repository.delete(`${resource}/delete`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

};
