// this is the PARENT class for the USERS and PRODUCTS repository classes
const fs = require('fs');
const crypto = require('crypto')

module.exports = class Repository {
    constructor(filename) { //ahh, our old friend the constructor function.
        if (!filename) { //ensures existence of somewhere for things to be saved.
            throw new Error('ERR: making a repository requires a filename (somewhere to save files)');
        }

        this.filename = filename; //instance variable. needed for local manipulation.
        try {
            fs.accessSync(this.filename) // asks, "does this file exist?"
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
            // ^^^ creates file if it doesn't exist. only contents are an empty array.
        }
    }
    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll()
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }
    async getAll() {
        // Open file, read, parse
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }
    // writes all users into the same JSON file
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null,2)) // writes updated records array back to this.filename
    }

    randomId() { //mazes a random 6-# hex for random id purposes
        return crypto.randomBytes(4).toString('hex');
    }
    // search function for 1 user, by randomId
    async getOne(id) {
        const records = await this.getAll();
        //accessing records is an invocation of getAll() method
        //.find() has a callback as an arg
        return records.find(record => record.id === id);
    }
    // very similar to getOne, at first. filter uses a callback as an arg
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        //invokes writeAll to overwrite records to exclude chosen record/id
        await this.writeAll(filteredRecords)
    }
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) {
            throw new Error(`record with id ${id} not found`);
        }
        //updates record object to take into account new attributes ('starsign', etc)
        Object.assign(record, attrs);
        await this.writeAll(records);
    }
    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) { // for OF loops is used on arrays
            let found = true;
            for (let key in filters) { //for IN loop is used on OBJECTS
                    if (record[key] !== filters[key]) {
                        found = false; // we didn't find the record we wanted
                    };
            }
            if (found === true) {
                return record;
            }
        }
    }
}
