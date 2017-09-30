const expect = require('chai').expect
const example = require('../src/example')

describe('Example', function () {
  it('#say() should return Hello World', function () {
    expect(example.say()).to.be.equal('Hello World');
  })
});
