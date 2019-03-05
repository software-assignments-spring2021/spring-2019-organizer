/* this is a file of unit tests*/
const assert = require("assert");
const utils = require("../src/utils");
const expect = require("chai").expect;

/*a test function*/
function testFunc1(a, b, c) {
    return a + b + c;
}
const f1 = utils.bundleFunc(testFunc1, 1, 2);
function testFunc2(a, b, c, d) {
    return a + b + c + d;
}
const f2 = utils.bundleFunc(testFunc2, 2, 3);

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

    describe('bundleFunc()', function() {
        it('return a + b + c = 6', function() {
            assert.equal(f1(3), 6);
        });
        it('return a + b + c + d = 19', function() {
            assert.equal(f2(12, 2), 19);
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
    describe('sum()', function() {
        it('return NaN if no arguments were passed in', function() {
            assert.equal(isNaN(utils.sum()), true);
        });
        it('return NaN if argument is not an Array', function() {
            assert.equal(isNaN(utils.sum({})), true);
        });
        it('return Nan if argument is not a number or a string', function() {
            assert.equal(isNaN(utils.sum(["ab", "a", 12])), true);
        });
        it('should not add non-array', function() {
            expect(utils.sum(([1,2,3].isarray)== (true)));
        });
        it('return sum if argument the input is correct as whole number', function() {
            assert.equal((utils.sum([3, 2, 12])), 17);
        });
        it('return sum even there is only one element', function() {
            assert.equal((utils.sum([3])), 3);
        });
        it('return sum even if an element from the input is negative', function() {
            assert.equal((utils.sum([3, -1, 12])), 14);
        });

    });
    describe('parlindrome()', function() {

        it('return true if it is a palindrome', function() {
            var result = utils.palindrome("aba")
            expect(result).to.equal(true)
        });
        it('return true if it is not a palindrome', function() {
            var result = utils.palindrome("abaa")
            expect(result).to.equal(false)
        });
});