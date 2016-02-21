"use strict";

const utils = require('./utils');
const Layer = require('./Layer');

/**
 * @class Route
 */
class Route {

  constructor() {
    this.stack = [];
  }

  handle(req, res, next) {
    let message = req.weixin || {};
    let iterator = this.stack[Symbol.iterator]();
    let layer;
    handler();

    function handler() {
      while (layer = iterator.next().value) {
        if (layer && utils.MessageMatch(message, layer.match)) {
          layer.handle(req, res, handler);
          return;
        }
      }
      if (typeof next === 'function')
        next();
    }
  }

  all(match, fn) {
    let default_match = {FromUserName: /.*/};
    let args = Array.prototype.slice.call(arguments);

    if (match && typeof args[0] === 'object' && !(args[0] instanceof Array)) {
      if (Object.keys(match).find(x=>x == 'FromUserName')) {
        default_match = match;
      }
      else {
        match.FromUserName = /.*/;
        default_match = match;
      }
      args.shift();
    }
    args.forEach(fn=> this.stack.push(new Layer(default_match, fn)))
  }
}

Object.keys(utils.MessageTypeEnum).forEach(x=> {
  /**
   *
   * @param match
   * @param handler
   * @returns {*}
   */
  Route.prototype[utils.MessageTypeEnum[x]] = function (match, handler) {
    let args = Array.prototype.slice.call(arguments);

    utils.ParamsFormat(args, utils.MessageTypeEnum[x]).forEach(m => this.stack.push(new Layer(m.match, m.handle)));

    return this;
  }
});

module.exports = Route;
