#!/usr/bin/env node
 //*******************************************************************
// REMEMBER: the point of this project is a watcher which EXECUTES all files
// in a dir, whenever they exist or change.
//*******************************************************************
const debounce = require('lodash.debounce'); // makes functions debouncy.
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs'); //allows us fs.promises.access
const {
    spawn
} = require('child_process'); {
    // INFO about caporal documentation, .methods()
    //Program: a cli app that you can build using Caporal
    // we'll need to chain on a few .methods() upon creation
    // .command() allows us to chain on specific sub-commands, e.g. 'watch AND run', 'watch AND delete'
    // .argument() specifies an argument a command will take. <arg> = mandatory, [arg] = optional.
    // .option() allows options. <mandatory> or [optional]
    //.action() will actually run it with args, options, etc.
    // none of these happen until we run varName.parse(process.argv)
    // with the following syntax, we can pass arguments and options to caporal directly:
    // program
    //  .version
    //  .command()
    //  .argument()
    //  [etc]
}
const chalk = require('chalk')
//*******************************************************************
// PROGRAM is the help app. We chain on methods here, too.
// its crux is .action(), which takes in other things (like .argument, .option), and implements functions for us.
program
    .version('0.0.1') //flags version for user
    .argument('[filename]', 'Name of a file to execute') //optional filename, otherwise checks indx.js
    .action(async ({
        filename
    }) => {
        const name = filename || index.js //if no filename, default to index.js
        try {
            await fs.promises.access(name); //ensures our name file exists
        } catch (err) {
            throw new Error(`Could not find the file ${name}`);
        }

        let proc; //see lesson 81.07 for 'kill' context.
        const start = debounce(() => {
            if (proc) {
                proc.kill();
            }
            console.log(chalk.yellowBright('>>> starting process'));
            proc = spawn('node', [name], {stdio: 'inherit'});
            //"run a different file using node, named [x] with the inherit option"
            // the INHERIT option is important because it lets the child process talk to us.
        }, 900);
        chokidar
            .watch('.') //watch('.') == watch current working dir
            .on('add', start) // not invoked, but named.
            .on('change', start)
            .on('unlink', start);
    });
//needs program.parse() to actually work
program.parse(process.argv); //argv = argument vector = array of arguments passed in.
