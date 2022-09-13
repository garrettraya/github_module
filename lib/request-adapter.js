/* eslint-disable camelcase */
const native_fetch_request = require('./native_fetch_request');

const request = (options) => native_fetch_request(options);

module.exports = request;
