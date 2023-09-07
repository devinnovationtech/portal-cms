/* eslint-disable func-names */
/* eslint-disable no-new */

import Compressor from 'compressorjs';

/**
 * Compress image using CompressorJs
 * for config reference read more: https://www.npmjs.com/package/compressorjs
 * @param {File} file
 * @param {Object} config
 * @returns {Promise}
 */
export const compressImage = function (file, config) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      ...config,
      success(result) {
        // Convert Blob to File
        const compressedFile = new File([result], `compressed_${file.name}`, {
          type: result.type,
          lastModified: Date.now(),
        });

        resolve(compressedFile);
      },
      error(err) {
        reject(err);
      },
    });
  });
};
