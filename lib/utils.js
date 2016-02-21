"use strict";

/**
 * wechat message type enumeration
 */
const MessageTypeEnum = {
  TEXT: 'text',
  IMAGE: 'image',
  VOICE: 'voice',
  VIDEO: 'video',
  SHORT_VIDEO: 'shortvideo',
  LOCATION: 'location',
  LINK: 'link',
  EVENT: 'event',
  DEVICE_TEXT: 'device_text',
  DEVICE_EVENT: 'device_event'
};

module.exports = {MessageTypeEnum, ParamsFormat, MessageMatch};

/**
 * format the params of function
 * @param {Array} args
 * @param {string} type
 * @returns {[{match:string,handle:function}]} format_params
 */
function ParamsFormat(args, type) {
  let format_params = [];
  let match = args[0];
  let default_match = {};

  if ((typeof args[0] === 'string' || (args[0] instanceof RegExp)) && type === MessageTypeEnum.TEXT) {
    default_match = {
      MsgType: type,
      Content: args[0]
    };
    args.shift();
  }
  else if (type && typeof args[0] === 'object' && !(args[0] instanceof Array)) {
    default_match = match;
    default_match.MsgType = type;
    args.shift();
  }
  else if (type && typeof args[0] == 'function') {
    default_match.MsgType = type;
  }
  else {
    throw new Error('the handle need functions');
  }

  args.forEach(fn=>format_params.push({match: default_match, handle: fn}));

  return format_params;
}

/**
 *
 * @param {Object} message
 * @param {Object} match
 * @returns {boolean}
 */
function MessageMatch(message, match) {
  return Object.keys(match).every(key=>
  message[key]
  && (typeof match[key] === 'string' && match[key] === message[key] || match[key] instanceof RegExp && match[key].test(message[key])));
}

