//KEY LEARNINGS:

// we used require('thing') to import packages and libraries into our code fs is
// a great module for working with the local file system. a lot of package
// functions follow the exact same syntax and argument types, often involving a
// callback function ()=>{}.

//we can wrap these package functions within a promise, or use promisify, or
//even uses a module giving us access to a promise-based version of the function
//we want.

// we created a JSON with project metadata for configuration purposes, with a
// bin{command:exe.js} that allowed us to turn scripts into command-line
// executables. It gets updated whenever we add in a package.

//the JSON also has a dependencies section, which was added in automatically
// when we installed chalk with "npm install chalk" in the terminal.

//.cwd() gives us the current working directory.

// we learned how to use chalk to pretty up our files in terminal.

