// we are going to make a command line tool which watches our PROJECT DIRECTORY
// and executes our files, and then executes them again if any change to the
// file is detected.

// aka nodemon

//#1
// we want to detect when ANYTHING changes in the folder
//      we'll use the CHOKIDAR package to do this
//      https://www.npmjs.com/package/chokidar

// const chokidar = require('chokidar');
// chokidar.watch('.').on('all', (event, path) => {
//   console.log(event, path);
// });

//#2
// we want to make some helpful functionality for other users.
//      we'll use CAPORAL to do this.
// https://www.npmjs.com/package/caporal

//#3
// we need to execute JS code from within a JS program.
// we'll use the module 'child_process' to execute a program.
//       https://nodejs.org/api/child_process.html
// key methods:
//       child_process.exec(command[, options][, callback])
//       child_process.fork(modulePath[, args][, options])
//       child_process.spawn(command[, args][, options])


