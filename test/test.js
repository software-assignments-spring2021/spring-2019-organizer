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
    describe('tolowercase()', function() {
        it('return NaN if no arguments were passed in', function() {
            assert.equal(isNaN(utils.tolowercase()), true);
        });
        it('return NaN if argument is not a String', function() {
            assert.equal(isNaN(utils.tolowercase(3)), true);
        });
        it('return NaN if argument is not a String', function() {
            assert.equal(isNaN(utils.tolowercase({})), true);
        });
        it('return lowercase string if argument is a string', function() {
            assert.equal(utils.tolowercase("I AM A UPPER STRING"), "i am a upper string");
        });
        it('return lowercase string if argument is a string', function() {
            assert.equal(utils.tolowercase("HelloWorld"), "helloworld");
        });
    });

    describe('touppercase()', function() {
        it('return NaN if no arguments were passed in', function() {
            assert.equal(isNaN(utils.touppercase()), true);
        });
        it('return NaN if argument is not a String', function() {
            assert.equal(isNaN(utils.touppercase(3)), true);
        });
        it('return NaN if argument is not a String', function() {
            assert.equal(isNaN(utils.touppercase({})), true);
        });
        it('return lowercase string if argument is a string', function() {
            assert.equal(utils.touppercase("I am a lower string"), "I AM A LOWER STRING");
        });
        it('return lowercase string if argument is a string', function() {
            assert.equal(utils.touppercase("HelloWorld"), "HELLOWORLD");
        });
    });
});