// we are making our own forEach based on the lodash one.
module.exports = {
    // format: name(array,function)
    forEach(arr, fn) {
        // // version 1:
        // // iterate, let the value progress, enact fn.
        // for (let i = 0; i < arr.length; i++) {
        //     const value = arr[i];
        //     fn(value, i)
        //     //technically we also pass the index in as the second arg to the function
        // }
        for (let index in arr) {
            
        }
    }
};

// instead of checking this works manually, how do we automate the verification?