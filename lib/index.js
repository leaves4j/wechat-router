"use strict";

const Route = require('./Route');

/**
 *
 * @class Router
 * @extends Route
 */
class Router extends Route {

  constructor() {
    super();

    function router(req, res, next) {
      router.handle(req, res, next)
    }

    Object.setPrototypeOf(router, this);

    return router;
  }
}

module.exports = Router;