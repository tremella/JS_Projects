// we're going to build our own version of LS to run in our terminal.

//LS can either be called without a path (in which case it shows you all the
// files and folders in your current dir, or, LS it can be run with a path, and
// it shows you the files/folders there.

// to do this we'll use the node.js standard doc and an API

//https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback

// Asynchronous readdir(3). Reads the contents of a directory. The callback gets
// two arguments (err, files) where files is an array of the names of the files
// in the directory excluding '.' and '..'.

//
// to get access to the file system module:

//https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
// fs.readdir(path[, options], callback) param info: path <string> | <Buffer> |
// <URL> options <string> | <Object> encoding <string> Default: 'utf8'
// withFileTypes <boolean> Default: false callback <Function> err <Error> files
// <string[]> | <Buffer[]> | <fs.Dirent[]></Error>
//****************
//common pattern in node.js: a callback function which takes an error and some
//data, as the third argument.
//basics, starter.

const fs = require('fs'); //module accessed using 'fs' as prefix.
// now we can access everything in the documentation:
// fs.mkdir,
// fs.linkSync,
// fs.link,   etc.

// '.' is a way of indicating curr dir
fs.readdir('.', (err, filenames) =>{ // callback func as arg.
    // EITHER
    // err === an error object, i.e. something broke
    // err === null, i.e. everything's fine.
    if (err) {
        //err handling code
        console.log(err);
        // throw new Error(err);
    }
    console.log(filenames);
});

// it works
//C:\Users\Jess\JavaScript Tutes\js projects\list>node index.js
// [ 'index.js', 'new project with node.js', 'node' ]
