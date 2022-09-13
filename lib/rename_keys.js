/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const _ = require('faster-underscore');

const rename_keys = (current_name, new_name, obj) => {
  obj[new_name] = obj[current_name];
  return _.omit(obj, current_name);
};

module.exports = rename_keys;
