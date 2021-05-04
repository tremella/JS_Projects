#!/usr/bin/env node
const Runner = require('./runner')

const runner = new Runner();

// helper
const run = async () => {
    const results = await runner.collectFiles(process.cwd());
    console.log(results);
}

run()