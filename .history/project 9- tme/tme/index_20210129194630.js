#!/usr/bin/env node
const Runner = require('./runner')

const runner = new Runner();

// helper
const run = async () => {
    await runner.collectFiles(process.cwd()); // cwd = curr working dir
    console.log(runner.testfiles);
}

run()

//[ 'index.js', 'package-lock.json', 'package.json', 'runner.js' ] {name:
//  'C:\\Users\\Jess\\JavaScript Tutes\\js projects\\project 6 -
//  shopping\\ecomm\\node_modules\\pstree.remy\\tests\\index.test.js'}]