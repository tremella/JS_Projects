// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality
const fs = require('fs')
const path = require('path')

class Runner {
    constructor() {
        this.testfiles = []; // to store references to all .test.js files
    }

    async collectFiles(targetPath) { // target path is the root folder.
        //fsPromises.readdir(path[, options])
        const files = await fs.promises.readdir(targetPath);
        for (let file of files) { // = file or folder
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);//lstat identifies it as a file or folder

            if (stats.isFile() && file.includes('.test.js')) {
                this.testfiles.push({name: filepath}); //array we want
            } else if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath)

                files.push(...childFiles);
                //unpacks internal files and pushes them into the TOP LEVEL of
                //this for loop (let file of files), to be iterated over.
            }
        }
    }


}




module.exports = Runner;