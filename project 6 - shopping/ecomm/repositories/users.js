const { create } = require('domain');
const fs = require('fs');
const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository')
const scrypt = util.promisify(crypto.scrypt) // so we can promisify

class UsersRepository extends Repository {
    //creates 1 user and their attributes, pushes them into records.
    // also handles SALT and hash password
    async create(attrs) {
        // {email: '', password:''} this is what we assume attrs is
        attrs.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);
        //salt + attrs.password
        const records = await this.getAll() //gets existing users
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        } // the fullstop splits the hashed pw from the salt
        records.push(record); // pushes new user into our records
        await this.writeAll(records);

        return record; // returns object with user ID, plus hash and salted pw
    }
    // compares user PW to saved PW
    async comparePasswords(saved, supplied) {
        // SAVED -> PW saved in our database. 'hashed.salt'
        // SUPPLIED -> raw PW given to us by user trying to login.

        // const result = saved.split('.');
        // const hashed = result[0];
        // const salt = result[1];
        //quicker way:
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
        return hashed === hashedSuppliedBuf.toString('hex');
    }
}

//our test area
// // const test = async () => {
// //     const repo = new UsersRepository('users.json');
// //     const user = await repo.getOneBy({password: 'waluigi'}) // LOOK FOR
// //     console.log(user)
// //     // const newuser = await repo.create({email: "aaa@email.com", password: "waluigi"}) //CREATE
// // }
// // test();

module.exports = new UsersRepository('users.json')