// test code always goes in its own file separate form what we're testing it ON
// testing is divorced from the purpose of the code you're writing.
// name convention is filename.test.js
const assert = require('assert')
const { forEach, map } = require('./index');

const test = (desc, fn) => { // desc describes the test, fn contains our test logic.
    console.log('---', desc);
    try{
        fn();
        console.log('no issues')
    } catch (err) {
        console.log(err.message)
    }
}

test ('the forEach function', () => {
    let sum = 0;
    forEach([1,2,3], (value) => {
        sum += value;
    })

    if (sum !== 6) {
        throw new Error('array should sum to 6');
    }

});

test(' the map function', () => {
    const result = map([1,2,3], value => {
        return value * 2;
    }) // result == [2,4,6]

    if (result[0] !== 2) {
        throw new Error(`expected to find 2 but found ${result[0]}`)
    }
    if (result[1] !== 4) {
        throw new Error(`expected to find 4 but found ${result[1]}`)
    }
    if (result[2] !== 6) {
        throw new Error(`expected to find 6 but found ${result[2]}`)
    }
});


