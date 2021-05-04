const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({errors}) => {
    return layout ({
        content: `
        <form method="POST">
        <input placeholder="Title" name="title" />
        <input placeholder="Price" name="price" />
        <input type="file"  name="image" />
        <button> Submit </button>
        </form>
        `
    })
};

// forms have defaul values when it comes to METHODS, and it's always GET.
// a method of "GET" takes the info from the form, adds it to the URL, and makes a request to the server with the URL
// "POST" takes the form info, puts it in the BODY of a post request, and puts that request to the backend server