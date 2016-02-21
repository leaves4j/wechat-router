"use strict";

const assert = require('assert');
const Layer = require('../lib/Layer');

describe('layer', ()=> {

  it('correct match and handle should be ok', ()=> {
    let test_match = {context: 'a'};
    let test_handle = function () {
      return 'return_handle'
    };
    let layer = new Layer(test_match, test_handle);

    assert.ok(layer.match);
    assert.deepEqual(layer.match, test_match);
    assert.ok(layer.handle);
    assert.equal(layer.handle, test_handle);
  });

  it('incorrect match should not be ok', ()=> {
    let test_handle = function () {
      return 'return_handle'
    };
    let err_match_1 = '';
    let err_match_2 = [];
    let err_match_3 = null;

    assert.throws(()=>new Layer(err_match_1, test_handle), 'the match not a object');
    assert.throws(()=>new Layer(err_match_2, test_handle), 'the match not a object');
    assert.throws(()=>new Layer(err_match_3, test_handle), 'the match not a object');
    assert.throws(()=>new Layer(undefined, test_handle), 'the match not a object');
  })
});