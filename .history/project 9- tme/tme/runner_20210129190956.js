// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality

class Runner {
    constructor() {
        this.files = []; // to store references to all .test.js files
    }

    collectFiles() {
        // iterate through folders and note when we find a test.js file
        // add each one to the this.files array
    }
}

// we could go breadth-first, or depth-first in terms of digging into a file
// tree.

// WHAT IS A BREADTH FIRST SEARCH? 
// Breadth first: starts at the parent folder, looks at immediate children. adds
// them to array. create for loop to iterate through each child folder, and
// looks at their immediate children. throw the children into the array. repeat.
// repeat. 



module.exports = Runner;