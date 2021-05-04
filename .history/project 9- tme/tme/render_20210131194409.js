// this file will take the path of an HTML document, and give it to the
// JSDOM.fromFile() function, which will simulate our DOM for us.
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom; //constructor object unpackaged from jsdom

const render = (filename) => {
    // the file we wanna open
    const filePath = path.join(process.cwd(),filename); // cwd = current working directory
    // what is process though?
};