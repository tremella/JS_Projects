// code for the process of collecting files, setting up the env, and running test.
// we're making a class so we can export functionality
const fs = require('fs')

class Runner {
    constructor() {
        this.files = []; // to store references to all .test.js files
    }

    async collectFiles(targetPath) { // target path is the root folder.
        //fsPromises.readdir(path[, options])
        const files = await fs.promises.readdir(targetPath);
        for (let fof of files) { // fof = file or folder
            //lstat identifies it as a file or folder
            const filepath = path.join(targetPath, fof)
        }
    }


}




module.exports = Runner;