/* this is a file of unit tests*/
const assert = require("assert");
const utils = require("../src/utils");

describe('utility functions', function() {
    describe('findMax()', function() {
        it('return NaN if no arguments were passed in', function() {
            assert.equal(isNaN(utils.findMax()), true);
        });
        it('return NaN if argument is not an Array', function() {
            assert.equal(isNaN(utils.findMax(3)), true);
        });
        it('return NaN if argument is not an Array', function() {
            assert.equal(isNaN(utils.findMax({})), true);
        });
        it('return max if argument is an Array', function() {
            assert.equal(utils.findMax([3, 19, 12]), 19);
        });
    });
});

describe('utility functions', function() {
    describe('textParsing()', function() {
        it('return undefined if no arguments were passed in', function() {
            assert.equal(utils.textParsing(), undefined);
        });
        it('return undefined if argument is not a string', function() {
            assert.equal(utils.textParsing(1), undefined);
        });
        it('return word array if argument has white space in the beginning or in the end', function() {
            assert.equal(JSON.stringify(utils.textParsing("  Hello ")) === JSON.stringify(["Hello"]), true);
        });
        it('return word array if argument has multiple word with white space between them', function() {
            assert.equal(JSON.stringify(utils.textParsing("Hello world")) === JSON.stringify(['Hello', 'world']), true);
        });
    });
});

describe('utility functions', function() {
    describe('filter()', function() {
        it('return undefined if no arguments were passed in', function() {
            assert.equal(utils.textParsing(), undefined);
        });
        it('return undefined if argument is not an Array', function() {
            assert.equal(utils.textParsing(1), undefined);
        });
        it('return the array without element greater than 0', function() {
            assert.equal(JSON.stringify(utils.filter([-1, 0, 1, 4, -5, 6])) === JSON.stringify([1, 4, 6]), true);
        });
    });
});