const counterObject = require('./myscript.js')

console.log(counterObject.getCounter());
counterObject.incrementCounter()
console.log(counterObject.getCounter());
// RETURNS 0,
//(then increments)
// RETURNS 1

const newCounterObject = require('./myscript.js')
console.log(newCounterObject.getCounter());
// RETURNS 1, NOT 0!

