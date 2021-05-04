// how will we do this?

// a unique class (object) for each part: USERS/PRODUCTS
// we'll name them REPOSITORIES
// side note: this DATA-MANAGING APPROACH is known as a REPOSITORY APPROACH: i.e. a single class (repository) is responsible for data access, and all records are stored and used as JS objects.
// the other one is an ACTIVE-RECORD APPROACH: common in ruby. uses "model" classes. Each record has its own st of methods.

const express = require('express');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session') //middleware
const app = express();
const authRouter = require('./routes/admin/auth')
const adminProductsRouter = require('./routes/admin/products')
const productsRouter = require('./routes/products')


//COOKIE MANAGER (safer than trying to manage them ourselves)
//C:\Users\Jess\[...]ecomm > npm install cookie-session

// this var (app) is an OBJECT that describes all the different things our web server
// can do. We will tweak it to tell our web server about the requests it get,
// and what to do with them.

//MIDDLEWARE
app.use(express.static('public')); // makes 'public' folder in dir available to outside world.
app.use(bodyParser.urlencoded({extended:true}));
// .use() applies bodyParser to ALL route Handlers (except a GET request??)
app.use(cookieSession({
    keys: ['KJB4t0gfbb2'] //encryption key to encrypt user cookies
}))
// END OF MIDDLEWARE

app.use(authRouter); //allows us to connect to the auth file which now has our route handling
app.use(adminProductsRouter);

// ROUTE HANDLER for 'GET' method

// start listening for incoming network requests
app.listen(3000, () => { //3000 is a port #
    console.log('listening');
});

