// putting validators here for easy use and reference in other files.

const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({min : 5, max : 40})
        .withMessage('Must be between 5 and 40 characters')
    ,
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({min : 1})
        .withMessage('Must be a number greater than 1')
    ,
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail() //sanitise, sanitise, validate
        .withMessage('must be a valid email')
        .custom(async email => {
            // this is where we flesh out the error handling
            const existingUser = await usersRepo.getOneBy({ email });
            // has someone used this email?
            if (existingUser) {
                throw new Error('email in use');
            }
        }),
    requirePassword: check('password')
        .trim()
        // .isLength({min: 4,max: 20 })
        // .withMessage('password must be between 4 and 20 characters'),
    ,requirePasswordConfirmation : check('passwordConfirmation')
        .trim()
        // .isLength({min: 4, max: 20})
        // .withMessage('password must be between 4 and 20 characters')
        // .custom((passwordConfirmation, {req})=>{
            // if (passwordConfirmation !== req.body.password) {
            //     throw new Error('passwords must match')
            // }
    }),
    requireEmailExists: check('email')
        .trim().normalizeEmail().isEmail()
        .withMessage('must provide a valid email')
        .custom(async(email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('Email not found!!')
            }
    }),
    requireValidPasswordForUser : check('password')
        .trim()
        .custom(async (password, { req })=> {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('invalid password');
            }
        const validPassword = await usersRepo.comparePasswords(
            user.password, // supplied at signUP
            password) //supplied at signIN
            //returns boolean
        if (!validPassword) {
            throw new Error('invalid password!!!!')
        }})
};