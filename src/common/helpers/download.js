/**
 * Download file from external url
 * @param {String} url
 *
 * @returns {Promise}
 */
export function downloadFile(url) {
  return new Promise((resolve, reject) => {
    // Get file name from url.
    const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        resolve(xhr.response);
      } else {
        reject(xhr.error);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}
