"use strict";

const assert = require('assert');
const Router = require('../lib');
const Layer = require('../lib/Layer');
const utils = require('../lib/utils');

describe('router', ()=> {

  it('router.all() should be ok', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.all((req, res, next)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {});
  });


  it('string match should be ok in router.text()', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.text('hello', (req, res, next)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {});
  });

  it('regular expression match should be ok in router.text()', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.text(/hello/, (req, res, next)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {}, ()=> {
    });
  });

  it('match with object should be ok ', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.text({Content: 'hello', FromUserName: 'from_user'}, (req, res, next)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {}, ()=> {
    });
  });

  it('no match should be ok', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.text((req, res, next)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {}, ()=> {
    });
  });


  it('next() and multiple functions should be ok', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    router.text((req, res, next)=> {
      assert.deepEqual(req, request);
      req.test = true;
      next();
    }, (req, res, nex)=> {
      assert.deepEqual(req, request);
      done();
    });

    router(request, {}, ()=> {
    });
  });

  it('router and function should be ok', (done)=> {
    let request = {
      weixin: {
        ToUserName: 'to_user',
        FromUserName: 'from_user',
        CreateTime: 1348831860,
        MsgType: 'text',
        Content: 'hello',
        MsgId: 1234567890123456
      }
    };

    let router = new Router();
    let anotherRouter = new Router();
    anotherRouter.text((req, res, nex)=> {
      assert.deepEqual(req, request);
      done();
    });
    router.text((req, res, next)=> {
      assert.deepEqual(req, request);
      req.test = true;
      next();
    }, anotherRouter);

    router(request, {}, ()=> {
    });
  });

});
