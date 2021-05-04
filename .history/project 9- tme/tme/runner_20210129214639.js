// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality
const fs = require('fs')
const path = require('path')

class Runner {
    constructor() {
        this.testFiles = []; // to store references to all .test.js files
    }

    async runTests() {
        for (let file of this.testFiles) {
            // this GLOBAL VARIABLE is available in all files and shared in all files
            // this allows us to export the it function to all other files we test on
            const beforeEaches = [];
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            };
            global.it = (desc, fn) => {
                beforeEaches.forEach(func => func());
                try { //format outcomes
                    fn();
                    console.log(`OK - ${desc}`)
                } catch (err) {
                    console.log(`X - ${desc}`)
                    console.log('\t', err.message)
                };
                try {
                    require(file.name);
                } catch (err) {
                    console.log('X - Error Loading File', file.name)
                }
            };
            require(file.name) // node finds file, read and executes code inside.
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