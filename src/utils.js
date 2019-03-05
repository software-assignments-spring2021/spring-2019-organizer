/*
    utils.js: this is a file of functions
    for unit testing
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

module.exports = {
    findMax:findMax
};