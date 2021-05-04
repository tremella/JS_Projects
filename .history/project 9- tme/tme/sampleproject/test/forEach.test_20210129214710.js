const assert = require('assert')
const {
    forEach
} = require('../index')

let numbers;
beforeEach(() => {
    numbers = [1, 2, 3]
})

it('should sum an array', () => {
    const numbers = [1, 2, 3]

    let total = 0
    forEach(numbers, (value) => {
        total += value;
    });
    assert.strictEqual(total, 6)
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
})
// C:\Users\Jess\JavaScript Tutes\js projects\project 9- tme\tme\sampleproject>mocha

//   √ should sum an array
//   1 passing (4ms)

it('beforeEach is run each time', () => {
    assert.strictEqual(numbers.length, 3)
})
aervergvzxcvS

// we can use mocha's 'it' function because we installed it globally in the
// console using -g we recreate this functionality as a demo, in our test
// runner.js using > global.it = (desc, fn) => {console.log(desc)};

// this is a mock-implementation of 'it' (from mocha)
// we're also going to do the same with beforeEach