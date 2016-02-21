"use strict";

const _match = Symbol('match');
const _handle = Symbol('handle');

/**
 * @class Layer
 */
class Layer {

  constructor(match, handler) {
    this[_match] = {};
    this[_handle] = new Function();
    this.handle = handler;
    this.match = match;
  }

  set match(match) {
    if (match && typeof match === 'object' && !(match instanceof Array)) {
      this[_match] = match;
    }
    else {
      throw new Error(`the match not a object`);
    }
  }

  get match() {
    return this[_match];
  }

  set handle(handle) {
    if (typeof handle === 'function') {
      this[_handle] = handle;
    }
    else {
      throw new Error(`the handle need function`);
    }
  }

  get handle() {
    return this[_handle];
  }
}

module.exports = Layer;