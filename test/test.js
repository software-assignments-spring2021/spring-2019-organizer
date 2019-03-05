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

    describe('findMin()', function() {
        it('return NaN if no arguments were passed in', function() {
            assert.equal(isNaN(utils.findMin()), true);
        });
        it('return NaN if argument is not an Array', function() {
            assert.equal(isNaN(utils.findMin(3)), true);
        });
        it('return NaN if argument is not an Array', function() {
            assert.equal(isNaN(utils.findMin({})), true);
        });
        it('return NaN if argument is not an Array of numbers', function() {
            assert.equal(isNaN(utils.findMin(['test', 1])), true);
        });
        it('return min if argument is an Array', function() {
            assert.equal(utils.findMin([3, 19, 12]), 3);
        });
    });

    describe('find()', function() {
        it('return false if no arguments were passed in', function() {
            assert.equal(utils.find(), false);
        });
        it('return false if only one arguments was passed in', function() {
            assert.equal(utils.find([1,2,3]), false);
        });
        it('return false if no array was passed in', function() {
            assert.equal(utils.find(3,3), false);
        });
        it('return false if argument is not an Array', function() {
            assert.equal(utils.find(3,{3:3}), false);
        });
        it('return false if the desired element is not in the Array', function() {
            assert.equal(utils.find(4,[3, 19, 12]), false);
        });
        it('return true if the desired element is in the Array', function() {
            assert.equal(utils.find(3,[3, 19, 12]), true);
        });
        it('return true if the desired element is in the Array', function() {
            assert.equal(utils.find('true',['this', 'is', 'true']), true);
        });
    });
});