// we are making our own forEach based on the lodash one. ditto for map.
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
            fn(arr[index], index);
        }
    },
    // _.map(collection, [iteratee=_.identity])
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i))
            //he still doesn't answer why we include this second i - it's
            //possible he'll use it for error tracking. as in, "where did this
            //happen?"
        }
        return result;
    }
};


// map: 'run a function on every element in this array. return an array with the transformed inputs.
// syntax: _.map(collection, [iteratee=_.identity])
// _.map([4,8], square)
//    => [16,64]
