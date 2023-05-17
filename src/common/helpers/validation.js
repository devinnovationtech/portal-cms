/**
 * Check valid email
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

/**
 * Check valid url
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  // eslint-disable-next-line no-useless-escape
  const urlPattern = /(http(s)?):\/\/(?:www\.|(?!www))[a-zA-Z0-9-@:%._\+~#=?]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
  return urlPattern.test(url);
}
