// test code always goes in its own file separate form what we're testing it ON
// testing is divorced from the purpose of the code you're writing.
// name convention is filename.test.js

const { forEach } = require('./index');

let sum = 0;
forEach([1,2,3], (value) => {
    sum += value;
})

if (sum !== 6) {
    throw new Error('array should sum to 6')
}