// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


class Runner {
    constructor() {
        this.testFiles = []; // to store references to all .test.js files
    }

    async runTests() {
        // for each of the files we test...
        for (let file of this.testFiles) {
            const beforeEaches = [];
            //what does this do???
            global.beforeEach = (fn) => { //makes beforeEach a global variable available outside the scope of this file
                beforeEaches.push(fn);
            };
            global.it = (desc, fn) => {
                //makes .it a global variable available outside the scope of this file
                beforeEaches.forEach(func => func());
                try { //format outcomes
                    fn();
                    console.log(chalk.green(`OK - ${desc}`))
                } catch (err) {
                    console.log(chalk.red(`X - ${desc}`))
                    console.log(chalk.red('\t', err.message))
                };
            };
            //THIS one catches other errors outside the functions
            // e.g. stray brackets at the end of the file
            try {
                require(file.name);
            } catch (err) {
                console.log(chalk.red(err))
            } // node finds file, read and executes code inside.
        }
    }

    async collectFiles(targetPath) { // target path is the root folder.
        //fsPromises.readdir(path[, options])
        const files = await fs.promises.readdir(targetPath);
        for (let file of files) { // = file or folder
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);//lstat identifies it as a file or folder

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({name: filepath}); //array we want
            } else if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath)

                files.push(...childFiles.map(f => path.join(file, f)));
                //unpacks internal files and pushes them into the TOP LEVEL of
                //this for loop (let file of files), to be iterated over.
            }
        }
    }
}




module.exports = Runner;