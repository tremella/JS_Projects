const debounce = (func,delay = 1000) => { // takes in a function
    let timeoutId;
    return (...args) => {       // returns our wrapper function //???? vid 230, @ 2.00-2.58
        // I understand that (...args) allows us to pass in multiple arguments, but what are the arguments even going to be??
        // I guess the args are the input events?
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null,args); //???? vid 230, @ 2.00-2.58
            // still not 100% sure what the args are
        }, delay)
    };
};

// // meanwhile in HTML land
// <script src="utils.js"></script>
// <script src="index.js"></script>