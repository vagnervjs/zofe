'use strict';

var assert = require('assert');
var utils = require('./progress-tracker');

/**
 * Utilitary function that converts 'ms' time to
 * an [hours, minuts, seconds] array.
 * @param  {number} ms time in milliseconds
 * @return {Array}
 */
function msToArray (ms) {
  return [((ms / 1000) % 60)|0,
          ((ms / (1000 * 60)) %60)|0,
          ((ms / (1000 * 60 * 60)) %24)|0].reverse();
}

// como `msToArray` sera utilizada para validar
// getTime, precisamos garantir que ela funciona.
describe('msToArray', function () {
  it('deal with lower bound', function() {
    assert.deepEqual(msToArray(0), [0, 0, 0]);
  });

  it('deal with any date', function() {
    assert.deepEqual(msToArray(1000), [0,0,1]);
    assert.deepEqual(msToArray(1*60*1000), [0,1,0]);
    assert.deepEqual(msToArray(1*60*60*1000), [1,0,0]);
    assert.deepEqual(msToArray(1*60*60*1000 + 1*60*1000 + 1000), [1,1,1]);
  });
});

// testamos entao o que realmente desejamos
describe('getTime', function() {
  var getTime = utils.getTime;

  it('be defined', function() {
    assert(!!getTime);
  });

  it('get correct ms from #t=0:57:35', function() {
    var t = '#t=0:57:35';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [0, 57, 35]);
  });

  it('get correct ms from #t=0:1:42', function() {
    var t = '#t=0:1:42';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [0, 1, 42]);
  });

  it('get correct ms from #t=1:00:00', function() {
    var t = '#t=1:00:00';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [1, 0, 0]);
  });

  it('get correct ms from #t=1:04:28', function() {
    var t = '#t=1:04:28';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [1, 4, 28]);
  });

  it('get correct ms from #t=04:28', function() {
    var t = '#t=04:28';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [0, 4, 28]);
  });

  it('get correct ms from #t=04:28', function() {
    var t = '#t=04:28';
    var time = getTime(t);

    assert.deepEqual(msToArray(time), [0, 4, 28]);
  });
});

describe('getNearest',function () {
  var getNearest = utils.getNearest;

  it('be defined',function () {
    assert(!!getNearest);
  });

  it('return the same point if only one',function () {
    var actual = getNearest([5], 10);
    var expected = 5;

    assert.equal(actual, expected);
  });

  it('return the max if nearer to the max',function () {
    var actual = getNearest([1, 13], 10);
    var expected = 13;

    assert.equal(actual, expected);
  });

  it('return the min if nearer to the min',function () {
    var actual = getNearest([1, 13], 3);
    var expected = 1;

    assert.equal(actual, expected);
  });
});
