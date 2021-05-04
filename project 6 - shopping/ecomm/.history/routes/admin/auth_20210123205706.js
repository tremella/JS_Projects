const express = require('express')
// destructuring { check } means we only get one func from this lib
const { handleErrors } = require('./middlewares')
const usersRepo = require('../../repositories/users')
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser } = require('./validators')


const router = express.Router() //
router.get('/signup', (req, res) => { // req,res = request, response
    res.send(signupTemplate({ req }));
});

// ROUTE HANDLER for 'POST' method
// sign up handler
router.post(
    '/signup',
    [
        requireEmail, //logic imported from validators.js
        requirePassword,//logic imported from validators.js
        requirePasswordConfirmation //logic imported from validators.js
    ],handleErrors(signupTemplate)
    //the results of these validation tools will be passed into the req object
    async (req, res) => {
        const {email, password } = req.body// destructure
        const user = await usersRepo.create({email , password});// store user in Users repo
        req.session.userId = user.id; // store id of user inside the user's cookie!
        // new object added to 'req' by cookie session this property is a JS
        // object. We can add in as many as we want to it. whenever we call
        // RES.SEND, the cookie library will look for this and check info that
        // changed. It'll be taken and encoded into a string, and it'll be
        // attached

        res.send('account created!')
    }
)

// generate our signout page
router.get('/signout', (req, res) => {
    req.session = null; // forget cookie info so user is anon again
    res.send('you\'re logged out')
    //in chrome: http://localhost:3000/signout
    //Set-Cookie: express:sess=;
})

// generate our 'signin' page
router.get('/signin', (req, res) => {
    res.send(signinTemplate({}))
    // sending empty object, bc this imported func expects an object to
    // destructure. If we haven't signed in yet, and haven't passed it anything,
    // it'll cack it, so we give it an empty obj to keep it happy.
})

//signin handler
router.post('/signin', [
    requireEmailExists, requireValidPasswordForUser
],
    async (req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(signinTemplate({ errors }));
    }        // let's find their old email and password within the req.body
        const { email } = req.body;

        const user = await usersRepo.getOneBy({
            email
        });

        req.session.userId = user.id;
        res.send('you are signed in!')
    }
)

module.exports = router;