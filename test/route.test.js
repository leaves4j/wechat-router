"use strict";

const assert = require('assert');
const Route = require('../lib/Route');
const Layer = require('../lib/Layer');
const utils = require('../lib/utils');

describe('route', ()=> {

  it('single function should be ok', ()=> {
    Object.keys(utils.MessageTypeEnum).forEach((x)=> {
      let route = new Route();

      route[utils.MessageTypeEnum[x]](()=> {
        return 'ok';
      });

      assert.ok(route.stack[0] instanceof Layer);
      assert.equal(route.stack[0].handle(), 'ok')
    });

    let route = new Route();

    route.all(()=> 'ok');

    assert.ok(route.stack[0] instanceof Layer);
    assert.equal(route.stack[0].handle(), 'ok')
  });

  it('multiple function should be ok', ()=> {
    Object.keys(utils.MessageTypeEnum).forEach((x)=> {
      let route = new Route();

      route[utils.MessageTypeEnum[x]](()=> {
        return 'ok';
      }, ()=> {
        return 'also ok'
      }, ()=> {
        return 'i am also ok'
      });

      assert.ok(route.stack.every(x => x instanceof Layer));
      assert.equal(route.stack[0].handle(), 'ok');
      assert.equal(route.stack[1].handle(), 'also ok');
      assert.equal(route.stack[2].handle(), 'i am also ok');
    });

    let route = new Route();

    route.all(()=> {
      return 'ok';
    }, ()=> {
      return 'also ok'
    }, ()=> {
      return 'i am also ok'
    });

    assert.ok(route.stack.every(x => x instanceof Layer));
    assert.equal(route.stack[0].handle(), 'ok');
    assert.equal(route.stack[1].handle(), 'also ok');
    assert.equal(route.stack[2].handle(), 'i am also ok');
  });

  it('object match with single function should be ok', ()=> {
    let match = {
      ToUserName: 'to_user',
      FromUserName: 'from_user',
      CreateTime: 1348831860,
      MsgType: 'text',
      Content: 'this is a test',
      MsgId: 1234567890123456
    };

    Object.keys(utils.MessageTypeEnum).forEach((x)=> {
      let route = new Route();

      route[utils.MessageTypeEnum[x]](match, ()=> {
        return 'ok';
      });

      assert.ok(route.stack.every(x => x instanceof Layer));
      route.stack.forEach(x => assert.deepEqual(x.match, match));
      assert.equal(route.stack[0].handle(), 'ok');
    });

    let route = new Route();

    route.all(match, ()=> 'ok');

    assert.ok(route.stack.every(x => x instanceof Layer));
    route.stack.forEach(x => assert.deepEqual(x.match, match));
    assert.equal(route.stack[0].handle(), 'ok');
  });

  it('object match with multiple function should be ok', ()=> {
    let match = {
      ToUserName: 'to_user',
      FromUserName: 'from_user',
      CreateTime: 1348831860,
      MsgType: 'text',
      Content: 'this is a test',
      MsgId: 1234567890123456
    };

    Object.keys(utils.MessageTypeEnum).forEach((x)=> {
      let route = new Route();

      route[utils.MessageTypeEnum[x]](match, ()=> {
        return 'ok';
      }, ()=> {
        return 'also ok'
      }, ()=> {
        return 'i am also ok'
      });

      assert.ok(route.stack.every(x => x instanceof Layer));
      route.stack.forEach(x => assert.deepEqual(x.match, match));
      assert.equal(route.stack[0].handle(), 'ok');
      assert.equal(route.stack[1].handle(), 'also ok');
      assert.equal(route.stack[2].handle(), 'i am also ok');
    });

    let route = new Route();

    route.all(match, ()=> {
      return 'ok';
    }, ()=> {
      return 'also ok'
    }, ()=> {
      return 'i am also ok'
    });

    assert.ok(route.stack.every(x => x instanceof Layer));
    route.stack.forEach(x => assert.deepEqual(x.match, match));
    assert.equal(route.stack[0].handle(), 'ok');
    assert.equal(route.stack[1].handle(), 'also ok');
    assert.equal(route.stack[2].handle(), 'i am also ok');
  });

  it('string or regular expression match with function should be ok in route.text', ()=> {
    let string_match = 'this is a text';
    let regular_match = /haha/;
    let route = new Route();

    route.text(string_match, ()=> {
      return 'ok';
    });
    route.text(regular_match, ()=> {
    });

    assert.ok(route.stack.every(x => x instanceof Layer));
    assert.deepEqual(route.stack[0].match, {MsgType: 'text', Content: 'this is a text'});
    assert.deepEqual(route.stack[1].match, {MsgType: 'text', Content: /haha/});

  });

  it('object match without FromUserName should be ok in route.all', ()=> {
    let match = {
      FromUserName: 'from_user',
      CreateTime: 1348831860,
      MsgType: 'text',
      Content: 'this is a test',
      MsgId: 1234567890123456
    };
    let route = new Route();

    route.all(match, ()=> 'ok');

    assert.ok(route.stack.every(x => x instanceof Layer));
    match.FromUserName = /.*/;
    assert.deepEqual(route.stack[0].match, match);

  });
});