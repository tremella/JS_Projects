// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality
const fs = require('fs')

class Runner {
    constructor() {
        this.files = []; // to store references to all .test.js files
    }

    async collectFiles(targetPath) { // target path is the root folder.

        // iterate through folders and note when we find a test.js file
        // add each one to the this.files array
    }// we could go breadth-first, or depth-first in terms of digging.


}




module.exports = Runner;