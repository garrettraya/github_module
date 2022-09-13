/* eslint-disable camelcase */

const _ = require('faster-underscore');
const add_default_headers = require('./add_default_headers');
const serialize_params = require('./serialize_params');
const format_response = require('./format_response');

/**
 *  Acts as a wrapper to convert from request to native-fetch
 *
 * @param {Object} options the request options
 * @returns {Promise<[]>} response from the request
 */
const native_fetch_request = async (options) => {
  let reformatted_options = options;

  // format params and append them to url
  reformatted_options = serialize_params(reformatted_options);

  if (undefined !== reformatted_options.json) {
    if ('boolean' !== typeof reformatted_options.json) {
      reformatted_options.body = JSON.stringify(reformatted_options.json);
    }
    reformatted_options = _.omit(reformatted_options, 'json');
  }
  // add default headers
  reformatted_options.headers = add_default_headers(reformatted_options.headers);

  try {
    const response = await fetch(reformatted_options.url, reformatted_options);
    return format_response(response);
  } catch (err) {
    return format_response(err);
  }
};

module.exports = native_fetch_request;
