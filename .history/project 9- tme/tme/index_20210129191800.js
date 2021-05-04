#!/usr/bin/env node
const Runner = require('./runner')

const runner = new Runner();

// helper
const run = async () => {
    const results = await runner.collectFiles(process.cwd()); // cwd = curr working dir
    console.log(results);
}

run()

//[ 'index.js', 'package-lock.json', 'package.json', 'runner.js' ]