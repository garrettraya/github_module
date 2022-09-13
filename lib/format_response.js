/* eslint-disable camelcase */
const RESPONSE_CODES = require('./response-codes');

const format_response = async (response) => {
  const formatted_response = {};
  if (null != response.cause) {
    formatted_response.error = response.cause;
    formatted_response.status = RESPONSE_CODES.INTERNAL_SEVER_ERROR_500;
    formatted_response.statusCode = RESPONSE_CODES.INTERNAL_SEVER_ERROR_500;
    formatted_response.message = response.message;
    return [formatted_response];
  }
  // try to parse the body
  try {
    formatted_response.body = await response.json();
  } catch (error) {
    // do nothing
  }
  if (null == formatted_response.body) {
    try {
      formatted_response.body = await response.text();
    } catch (error) {
      // do nothing
    }
  }
  if (null == formatted_response.body) {
    try {
      formatted_response.body = await response.arrayBuffer();
    } catch (error) {
      // do nothing
    }
  }

  if (null == formatted_response.body) {
    try {
      formatted_response.body = await response.blob();
    } catch (error) {
      // do nothing
    }
  }
  formatted_response.statusCode = response.status;
  formatted_response.status = response.status;
  formatted_response.statusText = response.statusText;
  formatted_response.ok = response.ok;
  formatted_response.success = true;
  if (!formatted_response.ok) {
    formatted_response.error = response.statusText;
    formatted_response.success = false;
  }
  return [formatted_response];
};

module.exports = format_response;
