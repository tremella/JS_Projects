// we are making our own forEach based on the lodash one.
module.exports = {
    // format: name(array,function)
    forEach(arr, fn) {
        // iterate, let the value progress, enact fn.
        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            fn(value, i) 
            //technically we also pass the index in as the second arg to the function
        }
    }
};