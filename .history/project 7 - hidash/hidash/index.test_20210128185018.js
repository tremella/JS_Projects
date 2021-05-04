// test code always goes in its own file separate form what we're testing it ON
// testing is divorced from the purpose of the code you're writing.
// name convention is filename.test.js

const { forEach, map } = require('./index');

let sum = 0;
forEach([1,2,3], (value) => {
    sum += value;
})

if (sum !== 6) {
    throw new Error('array should sum to 6');
}

const result = map([1,2,3], value => {
    return value * 2;
}) // result == [2,4,6]

if (result[0] !== 2) {
    throw new Error(`expected to find 2 but found ${result[0]}`)
}
if (result[1] !== 4) {
    throw new Error(`expected to find 4 but found ${result[0]}`)
}
if (result[2] !== 6) {
    throw new Error(`expected to find 6 but found ${result[0]}`)
}