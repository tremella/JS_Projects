#!/usr/bin/env node

// GOAL: make NLS compatible with other directories above us.

// REQUIRE statements are how we import packages in an npm/terminal context
const fs = require('fs'); // gives us fs.readdir and other stuff
const chalk = require('chalk') // gives us chalk package

const { lstat } = fs.promises;
const path = require('path'); // for 'nls..' issue


// console.log(process.argv) // gives us an array of strings. this array is indexable.
// // we can add to it by writing [nls insertthing] on the command line
// // [
// //     'C:\\Program Files\\nodejs\\node.exe',
// //     'C:\\Users\\Jess\\AppData\\Roaming\\npm\\node_modules\\list\\index.js',
// //     'randomStringIJustAdded'
// //   ]

const targetDir = process.argv[2] || process.cwd();
// initially threw an error when we tried to use 'nls ..'
// doesn't want to parse ".." as a path though "ls .." works fine.
// WHY? bc lstat is written to expect a CURRENT directory. 
// and we're invoking it with one that isn't.

// we handle this by doing path.join(targetDir, filename)
// e.g. "nls ../filename"

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }
    // MAP lstat to array!
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });
    const allStats = await Promise.all(statPromises);
    // will wait for all promises to resolve, and make array

    // one we're done, lookup file name
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        //log the file names and whether they're files.
        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
        console.log(chalk.bold.cyanBright(filenames[index]))
        }
    }
});

// C:\Users\Jess\JavaScript Tutes\js projects\list>nls ..
//   list
//   project 1 - timer
//   project 2 - moviefight
//   project 3 - maze game
//   project 4 - secret message app

// C:\Users\Jess\JavaScript Tutes\js projects\list>nls
//   basics of making a script into a node executable.txt
//   index.js
//   node
//   node_modules
//   package-lock.json
//   package.json
//   secretlyAfolder
