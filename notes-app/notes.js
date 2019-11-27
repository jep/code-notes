// The below comment prevents false warnings from jshint in vs code.

/*jshint esversion: 6 */

// core modules
const fs = require('fs');

// npm modules - npmjs.com
const chalk = require('chalk');
const fileName = 'notes.json';

// handles `app.js add --title="My title" --body="Text"`
const addNote = (title, body) => {
    const notes = loadNotes();

    if(!notes.find((note) => note.title === title)) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('Added note: ' + title));
    } else {
        console.log(chalk.red.inverse.bold('Error -> note title already exists.'));
    }

};

// handles `app.js remove --title="My note"`
const removeNote = (title) => {
    const notes = loadNotes();
    const noteExists = notes.filter((note) => note.title === title);

    if(noteExists.length > 0) {
        saveNotes(notes.filter(note => note.title != title));
        console.log(chalk.green.inverse.bold('Removed: ' + title));
    } else {
        console.log(chalk.red.inverse.bold('No note with that title was found.'));
    }
};

// handles `app.js read --title="My note"`
const readNote = (title) => {
    const notes = loadNotes();
    const noteExists = notes.find((note) => note.title === title);

    if(noteExists) {
        console.log(chalk.yellowBright.inverse(noteExists.title) + "\n\t" + noteExists.body);
    } else {
        console.log(chalk.red.inverse.bold('No note with that title was found.'));
    }
};

// handles `app.js list`
const listAll = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.blueBright.bold(note.title));
        console.log(chalk.yellowBright('\t' + note.body));
    });
};

// Save notes to file.
const saveNotes = (notes) => fs.writeFileSync(fileName, JSON.stringify(notes));

// load notes from file and return array.
const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(fileName).toString());
    } catch (e) {
        return [];
    }
};

// export our methods, making them available to app.js calls
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listAll: listAll,
    readNote: readNote
};
