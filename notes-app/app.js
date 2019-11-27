/*jshint esversion: 6 */

/*
 * My coding notes on developing a CLI note-taking app, written  
 * in javascript with node.js, as instructed in the most excellent 
 * Udemy Course "The Complete Node.js Developer Course" by Andrew 
 * Mead. 
 * https://udemy.com/course/the-complete-nodejs-developer-course-2
 * 
 * Verify Node is installed.
 *
 *  > node --version
 *  v12.13.1
 * 
 *  starting a project
 *  > mkdir notes-app
 *  > cd notes-app
 *  > notes-app > npm init
 * 
 * Using node modules.
 * 
 * node modules are like the standard library. the api docs 
 * include code samples showing how to use each api method.
 * https://nodejs.org/api/
 * 
 * the power of nodejs comes in its package ecosystem. the rule 
 * of thumb seems to be that whenever non-unique functionality 
 * is needed, it's quicker to use a module. modules are found by
 * searching on npmjs.com and reading the documentation for tips 
 * on using the module. modules are installed with a specific 
 * version, meaning instead of always using the latest version 
 * of a module, we use the version that works.
 * 
 * Installing a node module.
 * 
 * > npm i module@version
 * 
 * for this program, we use two modules: chalk and yargs. chalk is
 * a module for formatting terminal output text and yargs is a 
 * module for handling command-line arguments.
 * 
 * Installing yargs and chalk
 * 
 * > sudo npm i chalk@3.0.0
 * > sudo npm i yargs@15.0.2
 * 
 * To see install module version
 * > npm show <module>
 * 
 * Requiring modules.
 * Requiring is similar to importing in Python. We declare a const 
 * and assign the output of `require(module)`. For chalk:
 * 
 * const chalk = require('chalk')
 * 
 */

// npm modules - npmjs.com
const chalk = require('chalk');
const yargs = require('yargs');

// local modules -- my notes.js which contains methods for using the
// note-taking app. I declare this as the `notes` object.
const notes = require('./notes.js');

// start using the yargs module to construct arguments
yargs.usage('Usage: $0 <option> <arguments>');

yargs.epilog(chalk.greenBright("Notebook: ") + notes.fileName);

// specify the version of our application
yargs.version('1.0.0');

// Command usage examples.
yargs.example(chalk.yellowBright("$0"),"add --title=\"" + chalk.greenBright("Note #1") + "\" --body=\"" + chalk.greenBright("My first note.") + "\"");
yargs.example(chalk.yellowBright("$0"), "list");
yargs.example(chalk.yellowBright("$0"), " remove --title=\"" + chalk.greenBright("Note #1") + "\"");

// Create add command
yargs.command({
    command: 'add',
    alias: ['add', 'a'],
    describe: 'add a new note',
    builder: {
        // define --title and --body 
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv) {
        // call addNote() from notes.js passing value of --title/--body
        notes.addNote(argv.title, argv.body);
    }});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'removes an existing note',
    builder: {
        title: {
            describe: 'Title of note to remove.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

// create list command
yargs.command({
    command: 'list',
    alias: ['l', 'list'],
    describe: 'List all notes.',
    handler() {
        notes.listAll();
    }
});

// create read command
yargs.command({
    command: 'read',
    alias: ['read', 'r'],
    describe: 'Read an existing note',
    builder: {
        title: {
            describe: 'Title of note to read.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();
