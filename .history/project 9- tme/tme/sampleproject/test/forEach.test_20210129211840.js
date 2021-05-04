const assert = require('assert')
const { forEach } = require('../index')

it('should sum an array', () => {
    const numbers = [1,2,3]

    let total = 0
    forEach(numbers,(value) => {
        total += value;
    });
    assert.strictEqual(total, 6)
})
// C:\Users\Jess\JavaScript Tutes\js projects\project 9- tme\tme\sampleproject>mocha

//   √ should sum an array
//   1 passing (4ms)

// we can use mocha's 'it' function because we installed it globally in the console using -g