/* eslint-disable camelcase */
/* globals Headers */

const add_default_headers = (headers) => {
  const default_headers = new Headers();
  default_headers.append('Content-Type', 'application/json');

  if (null != headers) {
    const header_keys = Object.keys(headers);
    header_keys.forEach((header) => {
      default_headers.append(header, headers[header]);
    });
  }

  return default_headers;
};

module.exports = add_default_headers;
