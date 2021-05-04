#!/usr/bin/env node

console.log('file executed!!')

// TO GENERATE A PACKAGE.JSON FILE:
// (crucial to making any script executable via the command line)
// npm init -y
// e.g.
//Users\Jess\JavaScript Tutes\folderName> npm init -y

// this creates package.json and we need to put a bin(ary) object in there the
// key is the command line command name, the value is the file which becomes
// executable.

// {
//     "name": "watchit",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "bin": {
//       "watchit": "index.js"
//     }
//   }

// finally, link them in the command line with 'npm link'