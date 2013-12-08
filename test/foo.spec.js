/*global describe, it, expect, beforeEach, spyOn, afterEach, dump */
'use strict';

describe('gulp-karma', function(){

  describe('A suite', function() {
    it('contains spec with an expectation', function() {
      dump('Saying hello');
      expect(true).toBe(true);
    });
  });

  describe('A spec (with setup and tear-down)', function() {
    var foo;

    beforeEach(function() {
      foo = 0;
      foo += 1;
    });

    afterEach(function() {
      foo = 0;
    });

    it('is just a function, so it can contain any code', function() {
      expect(foo).toEqual(1);
    });

    it('can have more than one expectation', function() {
      expect(foo).toEqual(1);
      expect(true).toEqual(true);
    });
  });

  describe('A spy', function() {
    var foo, bar = null;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };

      spyOn(foo, 'setBar');

      foo.setBar(123);
      foo.setBar(456, 'another param');
    });

    it('tracks that the spy was called', function() {
      expect(foo.setBar).toHaveBeenCalled();
    });

    it('tracks its number of calls', function() {
      expect(foo.setBar.calls.length).toEqual(2);
    });

    it('tracks all the arguments of its calls', function() {
      expect(foo.setBar).toHaveBeenCalledWith(123);
      expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it('allows access to the most recent call', function() {
      expect(foo.setBar.mostRecentCall.args[0]).toEqual(456);
    });

    it('allows access to other calls', function() {
      expect(foo.setBar.calls[0].args[0]).toEqual(123);
    });

    it('stops all execution on a function', function() {
      expect(bar).toBeNull();
    });
  });

});
