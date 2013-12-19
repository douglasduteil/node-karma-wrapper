/* global Foo, describe, it, iit, expect */
'use strict';

describe('sqrt', function() {
  it('should compute the square root of 4 as 2', function() {
    expect(Foo.sqrt(4)).toEqual(2);
  });
  it('should compute the square root of 3 as 2', function() {
    expect(Foo.sqrt(3)).toEqual(2);
  });
  iit('should compute the square root of 2 as 2', function() {
    expect(Foo.sqrt(2)).toEqual(2);
  });
});
