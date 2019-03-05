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
    
    High Order Functions:
    1. bundle 2 functions:
    2. ...
*/

/* returns the minimum of an array
returns NaN if no  */
function findMin(l) {
    if (l === undefined || !(l instanceof Array)) {
        return NaN;
    } else {
        let min = l[0];
        let num;
        for (num of l) {
            if (!(typeof num === 'number')) {
                return NaN;
            }
            if (num < min) {
                min = num;
            }
        }
        return min;
    }
}

/* returns true if the desired element is in an array
false otherwise */
function find(element, l) {
    if (element === undefined || l === undefined || !(l instanceof Array)) {
        return false;
    } else {
        for (let i = 0; i < l.length; i++) {
            if (element === l[i]) {
                return true;
            }
        }
        return false;
    }
}

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

function tolowercase(l) {
    if(l === undefined ||
        !(typeof(l) === "string")) {
        return NaN;
    } else {
        const newstring = l.toLowerCase();
        return newstring;
    }
}

function touppercase(l) {
    if(l === undefined ||
        !(typeof(l) === "string")) {
        return NaN;
    } else {
        const newstring = l.toUpperCase();
        return newstring;
}
}

//add functions to exports
module.exports = {
    findMax:findMax,
    tolowercase:tolowercase,
    touppercase:touppercase,
    findMin: findMin,
    find: find
};