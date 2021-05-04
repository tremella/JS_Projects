// we're going to make an e-commerce app
// a node.js web server where people can 'buy' items.
// basically similar to ASOS: shopping cart, browsing, buying functionality.
// we'll aso make some 'admin only' pages for product creation and deletion

// concepts:
// varying access per user, signup pages
// element creation in the page
// DYNAMIC HTML GENERATION ON-REQUEST
// Making a custom datastore (this is usually not our problem)

//STRUCTURE:

// NODE-JS WEB SERVER > this is a program we will host on our LOCAL computer,
// and we will access the server from the BROWSER. to visit the SERVER, we will
// make a NETWORK REQUEST from the BROWSER. We will configure the SERVER to
// access these NETWORK REQUESTS. We will inspect the requests, and generate
// HTML to send back to the USER'S BROWSER.

// key concept!! as OPPOSED to writing a static HTML DOCs (which sit in our
// local directories), and simply opening them, INSTEAD, our server will take
// SNIPPETS of HTML and assemble them every time a  user makes a request.

// tldr; DYNAMIC HTML GENERATION ON-REQUEST

// also STORING info: user carts, different users, etc, in OUR OWN CUSTOM DATASTORE.

//setup:
// make a new project dir
// make a package json file
// install dependencies
// make a 'start'script to run it.

