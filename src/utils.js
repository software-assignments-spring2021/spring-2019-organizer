/*
    utils.js: this is a file of functions
    for unit testing
*/

/*brief:
Here is a list of functions to write for
unit-testing:
    Basic:
    1. findMax: return max in an array
    2. findMin: return min in an array
    3. filter(array, string): filter out
        a string in a list
        return a copy
    4. tolowercase
    5. touppercase
    6. text parsing
    7. find() find an item in an array
    8. sum
    9
    
    Higher Order Functions:
    1. bundle 2 functions:
*/



/* write a function that returns the maximum
of an array. Return nan if argument is not an 
array*/
function findMax(l) {
    if(l === undefined ||
        !(l instanceof Array)) {
        return NaN;
    } else {
        let maxi = l[0];
        let eachChar;
        for(eachChar of l) {
            if(eachChar > maxi) {
                maxi = eachChar;
            }
        }
        return maxi;
    }
}

/* a function that returns a new
function with args1 fixed*/
function bundleFunc(fn, ...args1) {
    return function (...args) {
        return fn(...args1, ...args);
    };
}


//add functions to exports
module.exports = {
    findMax:findMax,
    bundleFunc:bundleFunc
};