// test code always goes in its own file separate form what we're testing it ON
// testing is divorced from the purpose of the code you're writing.
// name convention is filename.test.js
const assert = require('assert');
const { forEach, map } = require('./index');

// const test = (desc, fn) => { // desc describes the test, fn contains our test logic.
//     console.log('---', desc);
//     try{
//         fn();
//         console.log('no issues')
//     } catch (err) {
//         console.log(err.message)
//     }
// }

it('the forEach function', () => {
    let sum = 0;
    forEach([1,2,3], (value) => {
        sum += value;
    })
    assert.strictEqual(sum, 6, "expected forEach to sum the array")
});

it(' the map function', () => {
    const result = map([1,2,3], value => {
        return value * 2;
    }) // result == [2,4,6]
    assert.deepStrictEqual(result, [2,4,7])
});

// worth noting that deepStrictEqual can shrink those three ^ into just one line.
// it returns THIS when wrong:
// Expected values to be strictly deep-equal:
// + actual - expected

//   [
//     2,
//     4,
// +   6
// -   7
//   ]