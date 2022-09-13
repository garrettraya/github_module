/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const qs = require('qs');

const createQueryString = (params) => qs.stringify(params, {
  arrayFormat: 'brackets',
});

const serialize_params = (options) => {
  let params = {};
  if (null != options.params) {
    params = options.params;
  }

  if (null != options.qs) {
    params = options.qs;
  }

  if ('string' === typeof params) {
    options.url = `${options.url}?${params}`;
  }
  if ('object' === typeof params && 0 !== Object.keys(params).length) {
    options.url = `${options.url}?${createQueryString(params)}`;
  }
  return options;
};

module.exports = serialize_params;
