// this file will take the path of an HTML document, and give it to the
// JSDOM.fromFile() function, which will simulate our DOM for us.
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom; //constructor object unpackaged from jsdom

const render = async (filename) => {
    // the file we wanna open
    const filePath = path.join(process.cwd(),filename);
    //process.cwd() returns the current working directory
    const dom = await JSDOM.fromFile(fileath, {
        runScripts : 'dangerously',//never use this with other ppl's code
        resources : 'unstable'
    });
    return dom;
};