#!/usr/bin/env node
const Runner = require('./runner')

const runner = new Runner();

// helper
const run = async () => {
    await runner.collectFiles(process.cwd()); // cwd = curr working dir
    console.log(runner.testfiles);
}

run()

//[ 'index.js', 'package-lock.json', 'package.json', 'runner.js' ]