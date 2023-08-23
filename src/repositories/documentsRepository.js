import Repository from './Repository';

const resource = '/document-archives';

export default {
  /**
   * Get Document List
   * @param {object} params
   *
   * @property {string} q - filter document by name
   * @property {number, string} per_page - how many document data to show
   * @property {number, string} page - filter document by page number
   *
   * @returns {Promise}
   */
  getDocumentList(params = {}) {
    return Repository.get(`${resource}`, { params });
  },

  /**
   * Store Document
   * @returns {Promise}
   */
  createDocument(body) {
    return Repository.post(`${resource}`, body);
  },

  /**
   * Get document status counter
   * @returns {Promise}
   */
  getStatusCounter() {
    return Repository.get(`${resource}/tabs`);
  },
  /**
   * Delete document by document ID
   * @param {number} id - ID of the document
   *
   * @returns {Promise}
   */
  deleteDocumentById(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },
  /**
   * get document by document ID
   * @param {number} id - ID of the document
   *
   * @returns {Promise}
   */
  getDocumentById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * update Document
   * @param {object} body - form request body
   * @param {number} id - ID of the document

   * @returns {Promise}
   */
  updateDocument(body, id = null) {
    return Repository.put(`${resource}/${id}`, body);
  },

  /**
   * update status Document (PUBLISHED, DRAFT, ARCHIVED)
   * @param {object} body - form request body
   * @param {number} id - ID of the document

   * @returns {Promise}
   */
  updateStatusDocument(body, id = null) {
    return Repository.put(`${resource}/${id}/status`, body);
  },
};
